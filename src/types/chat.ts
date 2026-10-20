export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id?: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  imageUrl?: string;
  sentimentScore?: number; // 1 (neutral/calm) to 10 (severe distress)
}

export interface ChatResponse {
  message: string;
  error?: string;
  distressScore?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  isAnonymous: boolean;
  createdAt: string;
}

