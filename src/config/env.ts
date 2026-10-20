/**
 * Validated and centralized environment configuration.
 * Prevents silent runtime failures when environment variables are missing.
 */

export interface AppEnv {
  geminiApiKey: string;
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
  };
  emailjs: {
    publicKey: string;
    serviceId: string;
    templateId: string;
  };
  apiBaseUrl: string;
  isDev: boolean;
  isProd: boolean;
}

export const env: AppEnv = {
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
  },
  emailjs: {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  },
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};

/**
 * Checks for missing required critical environment variables.
 * Emits a structured console warning in development mode.
 */
export function validateEnvironment(): { isValid: boolean; missing: string[] } {
  const missing: string[] = [];

  if (!env.geminiApiKey) missing.push('VITE_GEMINI_API_KEY');
  if (!env.emailjs.publicKey) missing.push('VITE_EMAILJS_PUBLIC_KEY');
  if (!env.emailjs.serviceId) missing.push('VITE_EMAILJS_SERVICE_ID');
  if (!env.emailjs.templateId) missing.push('VITE_EMAILJS_TEMPLATE_ID');

  if (missing.length > 0 && env.isDev) {
    console.warn(
      `[Environment Warning] The following environment variables are missing:\n- ${missing.join('\n- ')}\nSome platform features may operate in degraded/mock mode.`
    );
  }

  return {
    isValid: missing.length === 0,
    missing,
  };
}

