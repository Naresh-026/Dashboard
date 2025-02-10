'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Settings Button */}
      <motion.button
        className="fixed bottom-6 right-6 p-3 rounded-full bg-gray-800/50 
          backdrop-blur-lg shadow-lg hover:shadow-xl border border-gray-700/50
          text-gray-200 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <Cog6ToothIcon className="w-6 h-6" />
      </motion.button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Settings Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed bottom-20 right-6 w-80 bg-gray-800/90 
                rounded-xl shadow-xl border border-gray-700/50 z-50
                p-4 space-y-4 backdrop-blur-lg"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-100">Settings</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-gray-100"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Theme
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-gray-600
                      bg-gray-900 text-gray-100 text-sm"
                  >
                    <option value="dark">Dark</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Layout Density
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-gray-600
                      bg-gray-900 text-gray-100 text-sm"
                  >
                    <option value="comfortable">Comfortable</option>
                    <option value="compact">Compact</option>
                  </select>
                </div>

                {/* Add more settings as needed */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 