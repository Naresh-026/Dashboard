'use client';

import { SystemMetrics } from '@/types';
import { Card, Metric, Text } from '@tremor/react';
import { useEffect, useState } from 'react';

export default function SystemStats() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 0,
    memory: 0,
    uptime: '0:00:00'
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/metrics');
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card 
        decoration="top" 
        decorationColor="blue" 
        className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      >
        <Text>CPU Usage</Text>
        <Metric>{metrics.cpu}%</Metric>
      </Card>
      <Card 
        decoration="top" 
        decorationColor="green" 
        className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      >
        <Text>Memory Usage</Text>
        <Metric>{metrics.memory}%</Metric>
      </Card>
      <Card 
        decoration="top" 
        decorationColor="orange" 
        className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      >
        <Text>Uptime</Text>
        <Metric>{metrics.uptime}</Metric>
      </Card>
    </div>
  );
} 