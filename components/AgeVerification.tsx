'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { HEBREW_TRANSLATIONS, calculateAge, COLORS } from '@/lib/constants';

interface AgeVerificationProps {
  onAgeVerified: (birthYear: number) => void;
}

export default function AgeVerification({ onAgeVerified }: AgeVerificationProps) {
  const [birthYear, setBirthYear] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentYear = new Date().getFullYear();
  const minBirthYear = currentYear - 100;
  const maxBirthYear = currentYear - 13;

  const handleSubmit = async () => {
    setError('');

    if (!birthYear) {
      setError(HEBREW_TRANSLATIONS.invalid);
      return;
    }

    const year = parseInt(birthYear, 10);

    if (isNaN(year) || year < minBirthYear || year > maxBirthYear) {
      setError(HEBREW_TRANSLATIONS.invalid);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    onAgeVerified(year);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-darker via-dark to-darker flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="glass-strong p-8 md:p-12 backdrop-blur-xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold mb-2 animate-pulse">🎉</h1>
            <h2 className="text-3xl font-bold text-white mb-2">{HEBREW_TRANSLATIONS.appName}</h2>
            <p className="text-amber-400 font-semibold text-sm">
              {HEBREW_TRANSLATIONS.tagline}
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6"
          >
            {/* Question */}
            <div>
              <label className="block text-lg font-semibold mb-3 text-center">
                {HEBREW_TRANSLATIONS.selectYearOfBirth}
              </label>
            </div>

            {/* Input */}
            <motion.input
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              type="number"
              placeholder={HEBREW_TRANSLATIONS.enterBirthYear}
              value={birthYear}
              onChange={(e) => {
                setBirthYear(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              min={minBirthYear}
              max={maxBirthYear}
              className="w-full text-center text-xl font-bold"
              disabled={isSubmitting}
            />

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            {/* Helper Text */}
            <p className="text-white/50 text-xs text-center">
              {minBirthYear} - {maxBirthYear}
            </p>
          </motion.div>

          {/* Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn btn-primary w-full mt-8 text-lg"
          >
            {isSubmitting ? (
              <>
                <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                טוען...
              </>
            ) : (
              HEBREW_TRANSLATIONS.confirm
            )}
          </motion.button>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-white/40 text-xs text-center mt-6"
          >
            ✨ מה שקורה ב-VibeBox נשאר ב-VibeBox ✨
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
