export interface IncidentReport {
  id?: string;
  reporterName: string;
  email: string;
  message: string;
  evidenceLinks?: string[];
  evidenceFiles?: File[];
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  date?: string;
}

export interface EmailReportPayload {
  from_name: string;
  to_name: string;
  message: string;
  user_email: string;
  evidence_summary?: string;
}

