'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export default function Clock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const [hours, minutes, seconds, period] = formatTime(time).split(/:|\s/);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 shadow-lg"
    >
      <div className="flex items-baseline gap-2 font-mono tracking-tight mb-3">
        <AnimatePresence mode="popLayout">
          <motion.span 
            key={hours}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-4xl text-gray-800 dark:text-white font-bold"
          >
            {hours}
          </motion.span>
          <span className="text-blue-500 dark:text-blue-400 text-4xl">:</span>
          <motion.span 
            key={minutes}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-4xl text-gray-800 dark:text-white font-bold"
          >
            {minutes}
          </motion.span>
          <span className="text-blue-500 dark:text-blue-400 text-4xl">:</span>
          <motion.span 
            key={seconds}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-4xl text-gray-800 dark:text-white font-bold"
          >
            {seconds}
          </motion.span>
          <motion.span 
            key={period}
            className="text-xl text-blue-500 dark:text-blue-400 ml-2"
          >
            {period}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-4 w-4 text-blue-500 dark:text-blue-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {formatDate(time)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Helper functions
function getWeekNumber(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function getDayProgress(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return Math.round((totalSeconds / 86400) * 100);
} 