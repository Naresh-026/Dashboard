'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
}

export function Sidebar({ open, setOpen, children }: SidebarProps) {
  return (
    <div
      className={cn(
        "relative h-full border-r border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg",
        open ? "w-64" : "w-16"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="absolute -right-3 top-10 z-10 rounded-full p-1.5 bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        {open ? (
          <ChevronLeftIcon className="h-4 w-4" />
        ) : (
          <ChevronRightIcon className="h-4 w-4" />
        )}
      </button>
      {children}
    </div>
  );
}

interface SidebarBodyProps {
  className?: string;
  children: ReactNode;
}

export function SidebarBody({ className, children }: SidebarBodyProps) {
  return (
    <div className={cn("flex h-full flex-col p-4", className)}>
      {children}
    </div>
  );
}

interface SidebarLinkProps {
  link: {
    href: string;
    label: string;
    icon: ReactNode;
    onClick?: () => void;
  };
  active?: boolean;
}

export function SidebarLink({ link, active }: SidebarLinkProps) {
  return (
    <Link
      href={link.href}
      onClick={link.onClick}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 transition-all",
        "hover:bg-gray-100 dark:hover:bg-gray-700",
        active && "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
      )}
    >
      {link.icon}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-nowrap text-sm font-medium"
      >
        {link.label}
      </motion.span>
    </Link>
  );
} 