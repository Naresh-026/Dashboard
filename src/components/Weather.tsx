'use client';

import React, { useState, useEffect } from 'react';
import { CloudIcon, SunIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function Weather() {
  const [mounted, setMounted] = useState(false);
  // Mock data for now
  const mockWeather = {
    temp: 22,
    condition: 'Sunny',
    location: 'Your City'
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-4">
        {mockWeather.condition.toLowerCase().includes('cloud') ? (
          <CloudIcon className="h-12 w-12 text-gray-600 dark:text-gray-400" />
        ) : (
          <SunIcon className="h-12 w-12 text-yellow-500" />
        )}
        <div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white">
            {mockWeather.temp}°C
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            {mockWeather.condition}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {mockWeather.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 