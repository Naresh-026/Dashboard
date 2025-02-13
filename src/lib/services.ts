import { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'plex',
    name: 'Plex Media Server',
    port: 32400,
    description: 'Media streaming service',
    icon: 'PlayCircleIcon',
    url: 'http://localhost:32400'
  },
  {
    id: 'homeassistant',
    name: 'Home Assistant',
    port: 8123,
    description: 'Home automation platform',
    icon: 'HomeIcon',
    url: 'http://localhost:8123'
  },
  {
    id: 'pihole',
    name: 'Pi-hole',
    port: 80,
    description: 'Network-wide ad blocking',
    icon: 'NoSymbolIcon',
    url: 'http://localhost'
  },
  {
    id: 'nextcloud',
    name: 'Nextcloud',
    port: 443,
    description: 'Personal cloud storage',
    icon: 'CloudIcon',
    url: 'https://localhost'
  },
  {
    name: 'Example Service',
    description: 'An example service',
    url: 'http://localhost:3000',
    port: 3000,
    icon: 'ServerIcon'
  }
]; 