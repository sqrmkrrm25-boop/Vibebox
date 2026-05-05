'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Upload, Trophy, Lock, Unlock } from 'lucide-react';
import { HEBREW_TRANSLATIONS, EVENT_TYPES, eventTypeLabels, COLORS } from '@/lib/constants';

interface LandingPageProps {
  userAge: number;
  isAdult: boolean;
}

interface EventCard {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  locked?: boolean;
}

export default function LandingPage({ userAge, isAdult }: LandingPageProps) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<'physical' | 'virtual' | null>(null);

  const eventCards: EventCard[] = [
    {
      id: EVENT_TYPES.BIRTHDAY,
      label: eventTypeLabels[EVENT_TYPES.BIRTHDAY],
      icon: <Zap className="w-8 h-8" />,
      color: 'from-yellow-500 to-amber-600',
    },
    {
      id: EVENT_TYPES.ANNIVERSARY,
      label: eventTypeLabels[EVENT_TYPES.ANNIVERSARY],
      icon: <Users className="w-8 h-8" />,
      color: 'from-pink-500 to-red-600',
    },
    {
      id: EVENT_TYPES.FRIENDS_NIGHT,
      label: eventTypeLabels[EVENT_TYPES.FRIENDS_NIGHT],
      icon: <Users className="w-8 h-8" />,
      color: 'from-purple-500 to-indigo-600',
    },
    {
      id: EVENT_TYPES.WILD_DATE,
      label: eventTypeLabels[EVENT_TYPES.WILD_DATE],
      icon: <Zap className="w-8 h-8" />,
      color: 'from-red-500 to-orange-600',
      locked: !isAdult,
    },
    {
      id: EVENT_TYPES.FAMILY_KIDS,
      label: eventTypeLabels[EVENT_TYPES.FAMILY_KIDS],
      icon: <Users className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-darker via-dark to-darker px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-bold mb-2 animate-pulse">VibeBox</h1>
        <p className="text-amber-400 text-lg font-semibold tracking-wide">
          {HEBREW_TRANSLATIONS.tagline}
        </p>
        <div className="flex justify-center gap-2 mt-4 text-sm text-white/60">
          <span>🎂 {userAge} שנים</span>
          <span>•</span>
          <span>{isAdult ? '🎉 גישה מלאה' : '👨‍👩‍👧 מוד משפחה'}</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {!selectedEvent ? (
          <>
            {/* Event Selection */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-center mb-8">
                {HEBREW_TRANSLATIONS.selectEvent}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eventCards.map((card) => (
                  <motion.div
                    key={card.id}
                    variants={itemVariants}
                    onClick={() => !card.locked && setSelectedEvent(card.id)}
                    className={`group relative cursor-pointer ${card.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    whileHover={!card.locked ? { scale: 1.05 } : {}}
                    whileTap={!card.locked ? { scale: 0.95 } : {}}
                  >
                    <div
                      className={`glass-strong p-6 h-40 flex flex-col items-center justify-center relative overflow-hidden group-hover:glow-primary transition-all duration-300 ${
                        !card.locked ? `bg-gradient-to-br ${card.color}/10` : ''
                      }`}
                    >
                      {/* Background Gradient */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${card.color}`}
                      />

                      {/* Content */}
                      <div className="relative z-10 text-center">
                        <div className="flex justify-center mb-3">
                          {card.locked ? (
                            <Lock className="w-8 h-8 text-red-400" />
                          ) : (
                            <span className="text-3xl text-white opacity-75 group-hover:opacity-100 transition-opacity">
                              {card.icon}
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-lg">{card.label}</h3>
                        {card.locked && (
                          <p className="text-red-400 text-xs mt-2 font-semibold">
                            {HEBREW_TRANSLATIONS.underageMessage}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            >
              <button className="btn btn-primary text-lg px-8 py-4">
                {HEBREW_TRANSLATIONS.createRoom}
              </button>
              <button className="btn btn-accent text-lg px-8 py-4">
                {HEBREW_TRANSLATIONS.joinRoom}
              </button>
            </motion.div>
          </>
        ) : (
          <>
            {/* Game Mode Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-white/60 hover:text-white transition-colors mb-8 flex items-center gap-2 mx-auto"
              >
                ← חזרה
              </button>

              <h2 className="text-3xl font-bold mb-4">
                {eventTypeLabels[selectedEvent]}
              </h2>
              <p className="text-white/60 mb-8">בחר סוג משחק</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {/* Physical Mode */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGameMode('physical')}
                  className="glass-strong p-8 text-center hover:glow-primary transition-all duration-300"
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                  <h3 className="text-2xl font-bold mb-2">פיזי</h3>
                  <p className="text-white/60 text-sm">משימות ותשובות טקסט</p>
                </motion.button>

                {/* Virtual Mode */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGameMode('virtual')}
                  className="glass-strong p-8 text-center hover:glow-primary transition-all duration-300"
                >
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-2xl font-bold mb-2">וירטואלי</h3>
                  <p className="text-white/60 text-sm">שאלות בלבד</p>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}
