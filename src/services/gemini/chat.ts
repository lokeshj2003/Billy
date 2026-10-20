import { getGenAI, MODEL_NAME } from './config';
import { CHAT_PROMPTS } from './prompts';
import { ChatResponse } from '@/types/chat';

export class ChatService {
  private static instance: ChatService;
  private chatSession: any = null;

  private constructor() {
    this.initChatSession();
  }

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  private initChatSession() {
    try {
      const genAI = getGenAI();
      const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
      });

      this.chatSession = model.startChat({
        history: [
          {
            role: 'user',
            parts: CHAT_PROMPTS.INITIAL_CONTEXT,
          },
          {
            role: 'model',
            parts:
              'Understood. I am Billy, an empathetic AI assistant dedicated to providing safe, trauma-informed cyberbullying prevention and victim support.',
          },
        ],
      });
    } catch (err) {
      console.error('[ChatService] Failed to initialize chat session:', err);
      this.chatSession = null;
    }
  }

  public resetChat(): void {
    this.initChatSession();
  }

  public async sendMessage(message: string): Promise<ChatResponse> {
    try {
      if (!this.chatSession) {
        this.initChatSession();
      }

      if (!this.chatSession) {
        return {
          message:
            "I'm currently unable to connect to the AI service. Please check your Gemini API key in configuration, or reach out to support.",
          error: 'AI service unavailable',
        };
      }

      const result = await this.chatSession.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      // Analyze sentiment asynchronously
      const distressScore = await this.analyzeMessageSentiment(message);

      return {
        message: text,
        distressScore,
      };
    } catch (error) {
      console.error('[ChatService Error]:', error);
      return {
        message:
          "I hear you, and I want to help, but I'm having trouble processing your message right now. Please try again in a moment, or consider downloading this chat log to share with a counselor.",
        error: error instanceof Error ? error.message : 'Unknown communication error',
      };
    }
  }

  public async analyzeMessageSentiment(message: string): Promise<number> {
    try {
      const genAI = getGenAI();
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      const prompt = `Analyze the following message from a user seeking cyberbullying support.
Rate their distress/urgency on a scale from 1 (neutral/calm inquiry) to 10 (immediate threat of harm or severe crisis).
Return ONLY the single integer between 1 and 10.
Message: "${message.slice(0, 500)}"`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const score = parseInt(response.text().trim(), 10);
      return isNaN(score) ? 5 : Math.max(1, Math.min(10, score));
    } catch (error) {
      console.warn('[ChatService] Sentiment analysis skipped:', error);
      return 5;
    }
  }
}

export const chatService = ChatService.getInstance();
