export * from '@/types/chat';

export interface ChatHistory {
  messages: import('@/types/chat').ChatMessage[];
  sessionId: string;
}

export interface ImageProcessingResult {
  text: string;
  confidence?: number;
}

export interface FileValidationError {
  code: string;
  message: string;
}
