'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, CheckIcon } from '@heroicons/react/24/outline';

interface GridLayoutProps {
  children: React.ReactNode;
  onLayoutChange?: (layout: any) => void;
}

export default function GridLayout({ children, onLayoutChange }: GridLayoutProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [columns, setColumns] = useState(2);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="relative">
      <div className={`grid gap-4 transition-all duration-300 ${
        isEditing ? 'cursor-move' : ''
      }`} style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }}>
        {React.Children.map(children, (child) => (
          <motion.div
            drag={isEditing}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            className={`${isEditing ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
          >
            {child}
          </motion.div>
        ))}
      </div>

      <div className="fixed bottom-4 right-4 flex gap-2">
        {isEditing && (
          <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg">
            <button
              onClick={() => setColumns(Math.max(1, columns - 1))}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded"
            >
              -
            </button>
            <span className="px-3 py-1">
              {columns} cols
            </span>
            <button
              onClick={() => setColumns(Math.min(4, columns + 1))}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded"
            >
              +
            </button>
          </div>
        )}
        <button
          onClick={toggleEdit}
          className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg
            hover:shadow-xl transition-all duration-200"
        >
          {isEditing ? (
            <CheckIcon className="w-5 h-5 text-green-500" />
          ) : (
            <PencilIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
} 