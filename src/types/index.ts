export interface Service {
  id: string;
  name: string;
  description?: string;
  url: string;
  port?: number;
  logoUrl?: string;
  icon?: string;
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  uptime: string;
}