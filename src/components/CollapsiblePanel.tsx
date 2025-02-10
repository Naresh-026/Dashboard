'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface CollapsiblePanelProps {
  title: string;
  children: React.ReactNode;
}

export default function CollapsiblePanel({ title, children }: CollapsiblePanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      animate={{ height: isExpanded ? 'auto' : '48px' }}
      className="gradient-animate backdrop-blur-lg rounded-xl shadow-lg overflow-hidden
        border border-gray-700/30 glow bg-gray-800/50"
    >
      <div 
        className={`p-4 ${!isExpanded ? 'pb-0' : ''}`}
        style={{ height: isExpanded ? 'auto' : '48px' }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-300 hover:text-white"
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-4 h-4" />
            ) : (
              <ChevronDownIcon className="w-4 h-4" />
            )}
          </button>
        </div>

        <motion.div
          animate={{ 
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? '12px' : 0
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
} 