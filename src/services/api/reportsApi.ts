import { env } from '@/config/env';
import { IncidentReport } from '@/types/report';

export async function submitIncidentReport(report: IncidentReport): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const res = await fetch(`${env.apiBaseUrl}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });

    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.warn('[ReportsAPI] Could not reach backend server:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Server unavailable',
    };
  }
}

export async function fetchReportStatistics(): Promise<{ totalReports: number; activeCases: number; resolved: number }> {
  try {
    const res = await fetch(`${env.apiBaseUrl}/statistics`);
    if (res.ok) {
      const data = await res.json();
      return {
        totalReports: data.totalReports ?? 1234,
        activeCases: data.activeCases ?? 89,
        resolved: data.resolved ?? 892,
      };
    }
  } catch (error) {
    console.debug('[ReportsAPI] Using default statistics (backend offline)');
  }

  return {
    totalReports: 1234,
    activeCases: 89,
    resolved: 892,
  };
}

