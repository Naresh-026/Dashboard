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
        className="bg-white/70 dark:bg-gray-800/70 shadow-md"
      >
        <Text className="text-gray-600 dark:text-gray-300">CPU Usage</Text>
        <Metric className="text-gray-800 dark:text-white">{metrics.cpu}%</Metric>
      </Card>
      <Card 
        decoration="top" 
        decorationColor="green"
        className="bg-white/70 dark:bg-gray-800/70 shadow-md"
      >
        <Text className="text-gray-600 dark:text-gray-300">Memory Usage</Text>
        <Metric className="text-gray-800 dark:text-white">{metrics.memory}%</Metric>
      </Card>
      <Card 
        decoration="top" 
        decorationColor="orange"
        className="bg-white/70 dark:bg-gray-800/70 shadow-md"
      >
        <Text className="text-gray-600 dark:text-gray-300">Uptime</Text>
        <Metric className="text-gray-800 dark:text-white">{metrics.uptime}</Metric>
      </Card>
    </div>
  );
} 