import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '@/config/env';
import { db } from '../firebase/client';

export const GEMINI_API_KEY = env.geminiApiKey;
// High-speed, lightweight production model for real-time conversational chat
export const MODEL_NAME = 'gemini-3.5-flash-lite';

let genAIInstance: GoogleGenerativeAI | null = null;

export function getGenAI(): GoogleGenerativeAI {
  if (!genAIInstance) {
    if (!GEMINI_API_KEY) {
      console.warn('[Gemini Config] VITE_GEMINI_API_KEY is not defined. AI queries will fail.');
    }
    genAIInstance = new GoogleGenerativeAI(GEMINI_API_KEY || 'MISSING_API_KEY');
  }
  return genAIInstance;
}

export const genAI = getGenAI();
export { db };
