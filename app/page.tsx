'use client';

import { useState, useEffect } from 'react';
import AgeVerification from '@/components/AgeVerification';
import LandingPage from '@/components/LandingPage';
import { calculateAge, isAdult } from '@/lib/constants';

const AGE_STORAGE_KEY = 'vibebox_user_age';

export default function Home() {
  const [userAge, setUserAge] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved age
    const savedAge = localStorage.getItem(AGE_STORAGE_KEY);
    if (savedAge) {
      setUserAge(parseInt(savedAge, 10));
    }
    setIsLoading(false);
  }, []);

  const handleAgeVerified = (birthYear: number) => {
    const age = calculateAge(birthYear);
    setUserAge(age);
    localStorage.setItem(AGE_STORAGE_KEY, age.toString());
  };

  if (isLoading) {
    return (
      <div className="flex-center min-h-screen bg-gradient-to-b from-darker via-dark to-darker">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4" />
          <p className="text-white/60">טוען...</p>
        </div>
      </div>
    );
  }

  return userAge === null ? (
    <AgeVerification onAgeVerified={handleAgeVerified} />
  ) : (
    <LandingPage userAge={userAge} isAdult={isAdult(userAge)} />
  );
}
