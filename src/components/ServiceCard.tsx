'use client';

import { Service } from '@/types';
import { motion } from 'framer-motion';
import * as Icons from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

interface ServiceCardProps {
  service: Service;
  onRemove: () => void;
  onEdit: (editedService: Service) => void;
}

export default function ServiceCard({ service, onRemove, onEdit }: ServiceCardProps) {
  const [status, setStatus] = useState<'online' | 'offline'>('offline');
  const [isEditing, setIsEditing] = useState(false);
  const [editedService, setEditedService] = useState(service);
  const [logoError, setLogoError] = useState(false);
  const defaultLogo = '/images/default-service-icon.png';
  const Icon = Icons[service.icon as keyof typeof Icons];

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/check-status?url=${service.url}`);
        const data = await response.json();
        setStatus(data.isOnline ? 'online' : 'offline');
      } catch (error) {
        setStatus('offline');
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, [service.url]);

  const handleSave = () => {
    onEdit(editedService);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedService(service);
    setIsEditing(false);
  };

  const handleCardClick = () => {
    if (!isEditing) {
      window.open(service.url, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' }}
      transition={{ duration: 0.3 }}
      className="service-card backdrop-blur-lg rounded-xl shadow-lg relative group
        aspect-square max-w-[300px] w-full mx-auto glow cursor-pointer bg-gray-800/50"
      onClick={handleCardClick}
    >
      {isEditing ? (
        <div className="p-4 space-y-3 h-full overflow-y-auto">
          <input
            type="text"
            value={editedService.name}
            onChange={(e) => setEditedService({ ...editedService, name: e.target.value })}
            className="w-full px-2 py-1 text-sm rounded-md border border-gray-600 bg-gray-900 text-gray-100"
          />
          <input
            type="text"
            value={editedService.description || ''}
            onChange={(e) => setEditedService({ ...editedService, description: e.target.value })}
            placeholder="Description"
            className="w-full px-2 py-1 text-sm rounded-md border border-gray-600 bg-gray-900 text-gray-100"
          />
          <input
            type="url"
            value={editedService.logoUrl || ''}
            onChange={(e) => setEditedService({ ...editedService, logoUrl: e.target.value })}
            placeholder="Logo URL"
            className="w-full px-2 py-1 text-sm rounded-md border border-gray-600 bg-gray-900 text-gray-100"
          />
          <div className="flex justify-end gap-2">
            <button onClick={handleCancel} className="px-2 py-1 text-xs text-gray-400">
              Cancel
            </button>
            <button onClick={handleSave} className="px-2 py-1 text-xs bg-blue-500 text-white rounded">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 h-full flex flex-col items-center text-center">
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <img
              src={logoError ? defaultLogo : (service.logoUrl || defaultLogo)}
              onError={() => setLogoError(true)}
              alt={`${service.name} logo`}
              className="w-24 h-24 rounded-lg object-contain bg-gray-800/70 p-2"
            />
            <div>
              <h3 className="font-semibold text-gray-100 text-lg truncate max-w-[220px]">
                {service.name}
              </h3>
              {service.description && (
                <p className="text-sm text-gray-300 line-clamp-2 mt-1">
                  {service.description}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="opacity-0 group-hover:opacity-100 absolute top-1.5 right-6 text-blue-400"
          >
            <Icons.PencilIcon className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="opacity-0 group-hover:opacity-100 absolute top-1.5 right-1.5 
              text-red-400 hover:text-red-300"
          >
            <Icons.TrashIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </motion.div>
  );
} 