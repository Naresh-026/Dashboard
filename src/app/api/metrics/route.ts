import { NextResponse } from 'next/server';
import os from 'os';

export async function GET() {
  const cpuUsage = os.loadavg()[0] * 100 / os.cpus().length;
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const memoryUsage = ((totalMem - freeMem) / totalMem) * 100;
  const uptime = os.uptime();

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return NextResponse.json({
    cpu: Math.round(cpuUsage * 100) / 100,
    memory: Math.round(memoryUsage * 100) / 100,
    uptime: formatUptime(uptime)
  });
} 