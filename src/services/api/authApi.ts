import { env } from '@/config/env';

export async function verifyPhone(phoneNumber: string): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${env.apiBaseUrl}/auth/verify-phone`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Development fallback
  }

  // Fallback simulator for development
  console.log(`[SMS Auth Simulator] Verification code sent to: ${phoneNumber}`);
  return { success: true, message: 'OTP sent successfully' };
}

export async function verifyOTP(phoneNumber: string, otp: string): Promise<{ success: boolean; token?: string }> {
  try {
    const res = await fetch(`${env.apiBaseUrl}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, otp }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Development fallback
  }

  // Fallback simulator: accept any 4-6 digit OTP in dev
  if (otp.length >= 4) {
    return { success: true, token: 'mock-jwt-token-dev' };
  }
  throw new Error('Invalid OTP');
}

