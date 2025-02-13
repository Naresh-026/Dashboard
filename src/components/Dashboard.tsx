'use client';

import React, { useState } from 'react';
import SystemStats from './SystemStats';
import ServiceCard from './ServiceCard';
import Clock from './Clock';
import Weather from './Weather';
import ThemeToggle from './ThemeToggle';
import AddServiceModal from './AddServiceModal';
import TodoList from './TodoList';
import { Service } from '@/types';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useServices } from '@/hooks/useServices';
import CollapsiblePanel from './CollapsiblePanel';
import ProfileSection from './ProfileSection';
import ServicesDock from './ServicesDock';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { services, addService, removeService, editService } = useServices();
  const [isTodoExpanded, setIsTodoExpanded] = useState(true);

  return (
    <div className="min-h-screen dashboard-bg py-4 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <ThemeToggle />
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div className="scale-75 origin-left">
              <Clock />
            </div>
            <ProfileSection />
            <div className="scale-75 origin-right">
              <Weather />
            </div>
          </div>

          {/* System Info Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <CollapsiblePanel title="System Status">
              <div className="max-h-[150px] overflow-y-auto">
                <SystemStats />
              </div>
            </CollapsiblePanel>

            <CollapsiblePanel title="Tasks">
              <TodoList />
            </CollapsiblePanel>

            <CollapsiblePanel title="Coming Soon">
              <p className="text-gray-600 dark:text-gray-300">
                Future feature placeholder
              </p>
            </CollapsiblePanel>
          </div>

          {/* Services Section */}
          <div className="rounded-xl">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white p-2">Services</h2>
            <ServicesDock
              services={services}
              onRemove={removeService}
              onEdit={editService}
              onAdd={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <AddServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addService}
      />
    </div>
  );
} 