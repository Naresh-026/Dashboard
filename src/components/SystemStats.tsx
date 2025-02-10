'use client';

import { useState, useEffect } from 'react';

export default function SystemStats() {
  const [stats, setStats] = useState({
    cpu: 0,
    memory: 0,
    disk: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      setStats({
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        disk: Math.random() * 100
      });
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      <div>CPU: {stats.cpu.toFixed(1)}%</div>
      <div>Memory: {stats.memory.toFixed(1)}%</div>
      <div>Disk: {stats.disk.toFixed(1)}%</div>
    </div>
  );
} 