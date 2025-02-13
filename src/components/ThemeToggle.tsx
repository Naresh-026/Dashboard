'use client';

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useDarkMode } from '@/hooks/useDarkMode';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 right-4 p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 
        backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 text-yellow-500" />
      ) : (
        <MoonIcon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
} 