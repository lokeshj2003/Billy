import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/chat';
import { getCachedUserProfile, saveUserProfile } from '@/services/firebase/userService';

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(() => getCachedUserProfile());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(() => !getCachedUserProfile());

  useEffect(() => {
    const cached = getCachedUserProfile();
    if (cached) {
      setProfile(cached);
      setIsModalOpen(false);
    }
  }, []);

  const updateProfile = async (name: string, isAnonymous: boolean) => {
    const newProfile = await saveUserProfile(name, isAnonymous);
    setProfile(newProfile);
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    profile,
    isModalOpen,
    openModal,
    closeModal,
    updateProfile,
  };
}

