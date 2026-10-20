import { doc, setDoc } from 'firebase/firestore';
import { getFirebaseFirestore } from './client';
import { UserProfile } from '@/types/chat';

export async function saveUserProfile(name: string, isAnonymous: boolean): Promise<UserProfile> {
  const userId = isAnonymous
    ? `anon-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    : `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now().toString(36)}`;

  const profile: UserProfile = {
    id: userId,
    name: isAnonymous ? 'Anonymous' : name.trim(),
    isAnonymous,
    createdAt: new Date().toISOString(),
  };

  const db = getFirebaseFirestore();
  if (db) {
    try {
      await setDoc(doc(db, 'users', userId), profile);
    } catch (error) {
      console.warn('[Firebase] Could not save user profile to remote database:', error);
    }
  }

  // Also persist in localStorage for offline / session continuity
  try {
    localStorage.setItem('billy_user_profile', JSON.stringify(profile));
  } catch (err) {
    console.debug('Failed to cache user profile in localStorage:', err);
  }

  return profile;
}

export function getCachedUserProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem('billy_user_profile');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

