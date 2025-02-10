'use client';

import { useState, useEffect } from 'react';
import { Service } from '@/types';

export function useServices() {
  const [services, setServices] = useState<Service[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('services');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  const addService = (service: Omit<Service, 'id'>) => {
    setServices(prev => [...prev, { ...service, id: Date.now().toString() }]);
  };

  const removeService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const editService = (editedService: Service) => {
    setServices(prev => prev.map(service => 
      service.id === editedService.id ? editedService : service
    ));
  };

  return { services, addService, removeService, editService };
} 