import { useState, useCallback } from 'react';
import { chatService } from '@/services/gemini/chat';
import { ChatMessage } from '@/types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hello, I'm Billy. I'm here to support you in a completely safe and confidential space. If someone is harassing or bullying you online, you're not alone. What's been going on?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string, imageFile?: File | null) => {
    if (!content.trim() && !imageFile) return;

    setIsLoading(true);
    setError(null);

    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : undefined;

    const userMessage: ChatMessage = {
      role: 'user',
      content,
      timestamp: new Date(),
      imageUrl,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await chatService.sendMessage(content);

      if (response.error) {
        setError(response.error);
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        sentimentScore: response.distressScore,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    chatService.resetChat();
    setMessages([
      {
        role: 'assistant',
        content: "Chat reset. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
};
