import { getGenAI, MODEL_NAME } from './config';
import { CHAT_PROMPTS } from './prompts';
import { ChatResponse } from '@/types/chat';

/**
 * Fast 0ms local distress pattern scoring.
 * Prevents redundant secondary API calls that exhaust free tier quotas.
 */
function evaluateDistressScore(message: string): number {
  const lower = message.toLowerCase();

  const critical = [
    'kill myself',
    'suicide',
    'want to die',
    'end my life',
    'self harm',
    'harm myself',
    'cant take this anymore',
    'cant go on',
    'threatened to kill',
  ];
  if (critical.some((w) => lower.includes(w))) return 10;

  const highDistress = [
    'terrified',
    'scared',
    'stalking',
    'stalked',
    'blackmail',
    'blackmailing',
    'leaked my',
    'doxxed',
    'doxing',
    'harassing me every day',
    'cant stop crying',
    'afraid',
    'threat',
  ];
  if (highDistress.some((w) => lower.includes(w))) return 8;

  const medium = [
    'bully',
    'bullying',
    'mean',
    'hate',
    'ugly',
    'stupid',
    'rumors',
    'blocked',
    'calling me names',
    'group chat',
    'insult',
    'embarrassed',
  ];
  if (medium.some((w) => lower.includes(w))) return 6;

  return 2;
}

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
        systemInstruction: CHAT_PROMPTS.INITIAL_CONTEXT,
        generationConfig: {
          maxOutputTokens: 250, // Keeps generation lightweight and fast for free-tier quotas
          temperature: 0.7,
        },
      });

      this.chatSession = model.startChat({
        history: [],
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
            "I'm currently unable to connect to the AI service. Please verify your Gemini API key in configuration, or reach out to support.",
          error: 'AI service unavailable',
        };
      }

      // Single, direct chat request for fastest response time
      const result = await this.chatSession.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      const distressScore = evaluateDistressScore(message);

      return {
        message: text,
        distressScore,
      };
    } catch (error) {
      console.error('[ChatService Error]:', error);
      return {
        message:
          "I hear you, and I want to support you. It looks like the connection had a slight hiccup. Please try sending your message again, or use the email report option below to send details directly to our safety team.",
        error: error instanceof Error ? error.message : 'Communication error',
        distressScore: evaluateDistressScore(message),
      };
    }
  }
}

export const chatService = ChatService.getInstance();
