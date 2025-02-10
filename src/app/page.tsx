import Dashboard from '@/components/Dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Server Dashboard',
  description: 'Monitor your home server services',
};

export default function Home() {
  return <Dashboard />;
} 