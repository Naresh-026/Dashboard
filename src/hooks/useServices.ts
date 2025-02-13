'use client';

import { useState, useEffect } from 'react';
import { Service } from '@/types';

const DEFAULT_SERVICES: Service[] = [
  {
    name: 'Example Service',
    description: 'An example service',
    url: 'http://localhost:3000',
    port: 3000,
    icon: 'ServerIcon'
  }
];

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

  const addService = (service: Omit<Service, 'id' | 'icon'>) => {
    const newService = {
      ...service,
      id: Date.now().toString()
    };
    setServices(prev => [...prev, newService]);
  };

  const removeService = (serviceId: string) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
  };

  const editService = (updatedService: Service) => {
    const serviceWithPort = {
      ...updatedService,
      port: Number(updatedService.port)
    };
    setServices(prev => prev.map(service => 
      service.id === serviceWithPort.id ? serviceWithPort : service
    ));
  };

  return {
    services,
    addService,
    removeService,
    editService
  };
} 