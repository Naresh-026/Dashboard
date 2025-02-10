'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { Service } from '@/types';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (service: Omit<Service, 'id' | 'icon'>) => void;
}

type ServiceType = 'local' | 'external';

export default function AddServiceModal({ isOpen, onClose, onAdd }: AddServiceModalProps) {
  const [serviceType, setServiceType] = useState<ServiceType>('local');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    port: '',
    ipAddress: 'localhost',
    logoUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceUrl = serviceType === 'local' 
      ? `http://${formData.ipAddress}:${formData.port}`
      : formData.url;

    const logoUrl = formData.logoUrl || `${serviceUrl}/favicon.ico`;

    onAdd({
      name: formData.name,
      description: formData.description || '',
      url: serviceUrl,
      port: serviceType === 'local' ? parseInt(formData.port) : 0,
      logoUrl
    });
    
    setFormData({
      name: '',
      description: '',
      url: '',
      port: '',
      ipAddress: 'localhost',
      logoUrl: ''
    });
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="relative bg-gray-800/90 rounded-xl shadow-xl p-6 w-full max-w-md
          border border-gray-700/50 backdrop-blur-lg">
          <Dialog.Title className="text-xl font-semibold text-gray-100 mb-4">
            Add New Service
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-600
                  bg-gray-900 text-gray-100 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Description (Optional)
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-600
                  bg-gray-900 text-gray-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Logo URL (Optional)
              </label>
              <input
                type="url"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                placeholder="https://example.com/logo.png"
                className="w-full px-3 py-2 rounded-lg border border-gray-600
                  bg-gray-900 text-gray-100 text-sm"
              />
            </div>

            {serviceType === 'local' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    IP Address
                  </label>
                  <input
                    type="text"
                    value={formData.ipAddress}
                    onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                    placeholder="localhost or IP address"
                    className="w-full px-3 py-2 rounded-lg border border-gray-600
                      bg-gray-900 text-gray-100 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Port
                  </label>
                  <input
                    type="number"
                    value={formData.port}
                    onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-600
                      bg-gray-900 text-gray-100 text-sm"
                    required
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  External URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 rounded-lg border border-gray-600
                    bg-gray-900 text-gray-100 text-sm"
                  required
                />
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-300 hover:text-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 
                  text-white rounded-lg"
              >
                Add Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
} 