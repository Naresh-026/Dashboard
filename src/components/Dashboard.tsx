'use client';

import React, { useState } from 'react';
import SystemStats from './SystemStats';
import ServiceCard from './ServiceCard';
import Clock from './Clock';
import Weather from './Weather';
import AddServiceModal from './AddServiceModal';
import TodoList from './TodoList';
import { Service } from '@/types';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useServices } from '@/hooks/useServices';
import CollapsiblePanel from './CollapsiblePanel';
import ProfileSection from './ProfileSection';
import ServicesDock from './ServicesDock';
import SettingsButton from './SettingsButton';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { services, addService, removeService, editService } = useServices();
  const [isTodoExpanded, setIsTodoExpanded] = useState(true);

  return (
    <div className="min-h-screen dashboard-bg py-2 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4">
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
              <div className="max-h-[120px] overflow-y-auto">
                <SystemStats />
              </div>
            </CollapsiblePanel>

            <CollapsiblePanel title="Tasks">
              <div className="max-h-[120px] overflow-y-auto">
                <TodoList />
              </div>
            </CollapsiblePanel>

            <CollapsiblePanel title="Coming Soon">
              <p className="text-gray-300">
                Future feature placeholder
              </p>
            </CollapsiblePanel>
          </div>

          {/* Services Section */}
          <div className="rounded-xl mt-2">
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

      <SettingsButton />
    </div>
  );
} 