import emailjs from '@emailjs/browser';
import { env } from '@/config/env';
import { EmailReportPayload } from '@/types/report';

let isInitialized = false;

function ensureEmailJSInitialized(): boolean {
  if (isInitialized) return true;
  if (!env.emailjs.publicKey) {
    console.warn('[EmailService] EmailJS public key is not configured.');
    return false;
  }

  try {
    emailjs.init({ publicKey: env.emailjs.publicKey });
    isInitialized = true;
    return true;
  } catch (error) {
    console.error('[EmailService] Failed to initialize EmailJS:', error);
    return false;
  }
}

export async function sendIncidentEmail(payload: EmailReportPayload): Promise<{ success: boolean; message: string }> {
  const ready = ensureEmailJSInitialized();
  if (!ready || !env.emailjs.serviceId || !env.emailjs.templateId) {
    return {
      success: false,
      message: 'Email service is not configured. Please copy the report transcript manually.',
    };
  }

  try {
    const response = await emailjs.send(
      env.emailjs.serviceId,
      env.emailjs.templateId,
      {
        from_name: payload.from_name || 'Anonymous User',
        to_name: payload.to_name || 'Billy Safety Support',
        message: payload.message,
        user_email: payload.user_email,
        evidence_summary: payload.evidence_summary || '',
      },
      env.emailjs.publicKey
    );

    if (response.status === 200 || response.text === 'OK') {
      return { success: true, message: 'Incident report emailed successfully.' };
    }

    return { success: false, message: `Failed with status code: ${response.status}` };
  } catch (error) {
    console.error('[EmailService Error]:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email. Please try again.',
    };
  }
}

