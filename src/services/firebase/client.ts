import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { env } from '@/config/env';

let dbInstance: Firestore | null = null;

export function getFirebaseFirestore(): Firestore | null {
  if (dbInstance) return dbInstance;

  try {
    if (!env.firebase.apiKey) {
      console.warn('[Firebase] Firebase API key not configured. Firestore offline.');
      return null;
    }

    const app = getApps().length > 0 ? getApp() : initializeApp(env.firebase);
    dbInstance = getFirestore(app);
    return dbInstance;
  } catch (error) {
    console.error('[Firebase Error] Failed to initialize Firebase:', error);
    return null;
  }
}

export const db = getFirebaseFirestore();

