'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { Service } from '@/types';
import { PlusIcon } from '@heroicons/react/24/outline';

interface ServicesDockProps {
  services: Service[];
  onRemove: (id: string) => void;
  onEdit: (service: Service) => void;
  onAdd: () => void;
}

export default function ServicesDock({ services, onRemove, onEdit, onAdd }: ServicesDockProps) {
  const [mouseX, setMouseX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    setMouseX(0);
  };

  // Calculate total width to center content
  useEffect(() => {
    if (scrollRef.current && containerRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      if (scrollWidth < containerWidth) {
        const padding = (containerWidth - scrollWidth) / 2;
        scrollRef.current.style.paddingLeft = `${padding}px`;
      }
    }
  }, [services]);

  return (
    <div className="relative w-full flex justify-center">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-7xl overflow-x-auto scrollbar-hide"
      >
        <div 
          ref={scrollRef}
          className="flex flex-wrap gap-6 justify-center items-center min-h-[350px]"
        >
          {services.map((service, index) => {
            const distance = mouseX - (index * 308 + 154);
            const scale = Math.max(1, 1 - Math.abs(distance) / 600);
            
            return (
              <motion.div
                key={service.id}
                animate={{ scale }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex items-center justify-center"
                style={{ 
                  transformOrigin: "center center",
                  zIndex: scale > 1 ? 10 : 1
                }}
              >
                <ServiceCard
                  service={service}
                  onRemove={() => onRemove(service.id)}
                  onEdit={onEdit}
                />
              </motion.div>
            );
          })}
          
          <motion.button
            onClick={onAdd}
            whileHover={{ scale: 1.05 }}
            className="h-[150px] w-[150px] flex items-center justify-center
              bg-gradient-to-br from-blue-500/20 to-purple-500/20 
              dark:from-blue-500/10 dark:to-purple-500/10
              backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10
              group transition-all duration-200 hover:border-blue-500/30"
          >
            <PlusIcon className="w-5 h-5 text-blue-500/50 group-hover:text-blue-500 
              transition-colors duration-200" />
          </motion.button>
        </div>
      </div>
    </div>
  );
} 