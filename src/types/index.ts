export interface Service {
  id: string;
  name: string;
  description?: string;
  url: string;
  port?: number;
  icon?: string;
  logoUrl?: string;
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  uptime: string;
}