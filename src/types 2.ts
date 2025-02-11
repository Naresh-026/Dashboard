export interface Service {
  id: string;
  name: string;
  description?: string;  // Make description optional
  url: string;
  port?: number;  // Make port optional
  logoUrl?: string;  // Add optional logo URL
  icon?: string;  // Keep this if you're still using icons
} 