import { LucideIcon } from 'lucide-react';

export interface CategoryBreakdown {
  category: string;
  percentage: number;
}

export interface StatMetric {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  description: string;
  progress: number;
  breakdown: CategoryBreakdown[];
}

export interface MonthlyTrendData {
  month: string;
  Cyberbullying: number;
  Harassment: number;
}

export interface IncidentRecord {
  id: number;
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Active' | 'Resolved' | 'Under Review';
  date: string;
}

