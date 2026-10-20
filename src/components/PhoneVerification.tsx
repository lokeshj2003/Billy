import React, { useState } from 'react';
import { verifyPhone, verifyOTP } from '../services/api';
import { Phone, KeyRound, AlertCircle, Loader2 } from 'lucide-react';

interface Props {
  onVerificationComplete: (phoneNumber: string) => void;
}

export const PhoneVerification: React.FC<Props> = ({ onVerificationComplete }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setLoading(true);
    setError('');
    try {
      await verifyPhone(phoneNumber);
      setStep('otp');
    } catch {
      setError('Failed to send verification code. Please check your number.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;

    setLoading(true);
    setError('');
    try {
      await verifyOTP(phoneNumber, otp);
      onVerificationComplete(phoneNumber);
    } catch {
      setError('Invalid or expired verification code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl border border-indigo-100">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-2">
          {step === 'phone' ? <Phone className="w-6 h-6" /> : <KeyRound className="w-6 h-6" />}
        </div>
        <h3 className="text-lg font-bold text-gray-900">
          {step === 'phone' ? 'Emergency Contact Verification' : 'Enter 6-Digit Code'}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {step === 'phone'
            ? 'Verify a phone number to receive urgent cyber safety alerts'
            : `We sent a security SMS to ${phoneNumber}`}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {step === 'phone' ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-gray-900"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !phoneNumber.trim()}
            className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition shadow-md disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Send SMS Code</span>
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Security Code (OTP)
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="e.g. 123456"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-gray-900 text-center tracking-widest text-lg font-mono"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !otp.trim()}
            className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition shadow-md disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Confirm & Verify</span>
          </button>
          <button
            type="button"
            onClick={() => setStep('phone')}
            className="w-full text-xs text-gray-500 hover:text-indigo-600 text-center block pt-2"
          >
            Change Phone Number
          </button>
        </form>
      )}
    </div>
  );
};

export default PhoneVerification;
