import React, { useState } from 'react';
import { Send, Download, CheckCircle, AlertCircle, ShieldAlert } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { ChatMessage, UserProfile } from '@/types/chat';
import { sendIncidentEmail } from '@/services/email/emailService';
import { formatChatReportText, downloadChatReport } from '@/utils/exportReport';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  userProfile?: UserProfile | null;
}

export const EmailReportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  messages,
  userProfile,
}) => {
  const [userEmail, setUserEmail] = useState('');
  const [recipient, setRecipient] = useState('support@billysafety.org');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail.trim()) return;

    setIsLoading(true);
    setStatus({ type: null, message: '' });

    const transcript = formatChatReportText(messages, userProfile);
    const combinedMessage = notes
      ? `USER SUMMARY NOTES:\n${notes}\n\n=================================\n${transcript}`
      : transcript;

    const result = await sendIncidentEmail({
      from_name: userProfile?.name || 'Anonymous User',
      to_name: 'Billy Incident Response',
      user_email: userEmail,
      message: combinedMessage,
      evidence_summary: `Case reported by ${userProfile?.name || 'Anonymous'}. Includes ${messages.length} conversation logs.`,
    });

    setIsLoading(false);
    if (result.success) {
      setStatus({ type: 'success', message: 'Report transmitted safely to the support team.' });
      setTimeout(() => {
        onClose();
        setStatus({ type: null, message: '' });
      }, 2000);
    } else {
      setStatus({ type: 'error', message: result.message });
    }
  };

  const handleDownload = () => {
    downloadChatReport(messages, userProfile);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        <DialogHeader className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white p-6">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-6 h-6 text-indigo-200" />
            <DialogTitle className="text-xl font-bold text-white">Escalate Incident Report</DialogTitle>
          </div>
          <DialogDescription className="text-indigo-200 text-sm mt-1">
            Dispatch your incident details and chat evidence securely to counselors or support staff.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
          {status.type === 'success' && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center space-x-2 text-sm">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          {status.type === 'error' && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-center space-x-2 text-sm">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Your Contact Email (for updates)
            </label>
            <input
              type="email"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="e.g. you@example.com"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-gray-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Recipient Department
            </label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-gray-900 bg-white"
            >
              <option value="support@billysafety.org">Billy Safety Response Team</option>
              <option value="school-counselor@domain.edu">School / University Counselor</option>
              <option value="cyber-cell@safety.org">Cyber Crime & Threat Assessment</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Additional Details or Victim Statement (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add handles of the cyberbully, social media links, or context..."
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-gray-900 resize-none"
            />
          </div>

          <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 flex items-center justify-between">
            <span>Includes <strong>{messages.length}</strong> logged conversation messages.</span>
            <button
              type="button"
              onClick={handleDownload}
              className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Preview / Download</span>
            </button>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !userEmail.trim()}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>{isLoading ? 'Transmitting...' : 'Send Secure Report'}</span>
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
