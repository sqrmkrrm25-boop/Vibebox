'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HEBREW_TRANSLATIONS, calculateAge, UNDERAGE_THRESHOLD } from '@/lib/constants';

interface AgeVerificationProps {
  onAgeVerified: (age: number, isAdult: boolean) => void;
}

export default function AgeVerification({ onAgeVerified }: AgeVerificationProps) {
  const [birthYear, setBirthYear] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const maxYear = currentYear - 13;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!birthYear) {
      setError(HEBREW_TRANSLATIONS.yearRequired);
      return;
    }

    const year = parseInt(birthYear);

    if (year < minYear || year > maxYear) {
      setError(HEBREW_TRANSLATIONS.invalidYear);
      return;
    }

    setIsSubmitting(true);

    // Simulate slight delay for UX
    setTimeout(() => {
      const age = calculateAge(year);
      const isAdult = age >= UNDERAGE_THRESHOLD;

      // Store in localStorage
      localStorage.setItem('userAge', age.toString());
      localStorage.setItem('userBirthYear', year.toString());
      localStorage.setItem('ageVerified', 'true');

      onAgeVerified(age, isAdult);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md">
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent animate-pulse">
            VibeBox
          </h1>
          <p className="text-white/60 text-lg">{HEBREW_TRANSLATIONS.welcomeMessage}</p>
        </motion.div>

        {/* Form Container */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-strong p-8 backdrop-blur-xl"
        >
          {/* Instructions */}
          <div className="mb-6">
            <p className="text-white/80 text-center mb-4">
              {HEBREW_TRANSLATIONS.ageVerificationText}
            </p>
            <p className="text-amber-400 text-center text-sm font-semibold">
              {HEBREW_TRANSLATIONS.adultContent}
            </p>
          </div>

          {/* Birth Year Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-white">
              {HEBREW_TRANSLATIONS.birthYearLabel}
            </label>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => {
                setBirthYear(e.target.value);
                setError('');
              }}
              placeholder={currentYear - 25}
              min={minYear}
              max={maxYear}
              className={`w-full px-4 py-3 rounded-lg bg-white/10 border-2 backdrop-blur-xl text-center text-2xl font-bold text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 transition-all ${
                error ? 'border-red-500' : 'border-white/20'
              }`}
              disabled={isSubmitting}
            />
            <p className="text-xs text-white/60 text-center mt-2">
              {HEBREW_TRANSLATIONS.yearRange}: {minYear} - {maxYear}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg"
            >
              <p className="text-red-400 text-sm text-center font-semibold">{error}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn btn-primary py-3 text-lg font-bold mb-4 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} />
                {HEBREW_TRANSLATIONS.verifying}
              </span>
            ) : (
              HEBREW_TRANSLATIONS.continueButton
            )}
          </motion.button>

          {/* Legal Notice */}
          <p className="text-xs text-white/40 text-center">
            {HEBREW_TRANSLATIONS.legalNotice}
          </p>
        </motion.form>

        {/* Background Glow */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl -z-10"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl -z-10"
        />
      </div>
    </motion.div>
  );
}
