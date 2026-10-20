import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, EyeOff } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onSave: (name: string, isAnonymous: boolean) => Promise<void>;
  initialName?: string;
  initialAnonymous?: boolean;
}

export const UserOnboardingModal: React.FC<Props> = ({
  isOpen,
  onSave,
  initialName = '',
  initialAnonymous = false,
}) => {
  const [name, setName] = useState(initialName);
  const [isAnonymous, setIsAnonymous] = useState(initialAnonymous);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAnonymous && !name.trim()) return;

    setIsSubmitting(true);
    try {
      await onSave(name, isAnonymous);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-indigo-100"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 text-white text-center">
              <div className="w-14 h-14 bg-white/20 rounded-2xl mx-auto flex items-center justify-center mb-3">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Welcome to Billy</h3>
              <p className="text-indigo-100 text-sm mt-1">
                Your safe, confidential ally against cyberbullying
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  How would you like to be addressed?
                </label>
                {!isAnonymous ? (
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900"
                      required={!isAnonymous}
                      autoFocus
                    />
                  </div>
                ) : (
                  <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center space-x-3 text-indigo-800 text-sm">
                    <EyeOff className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>You will appear as <strong>Anonymous User</strong>. No personal identifier will be attached.</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3 pt-1">
                <input
                  type="checkbox"
                  id="anonymousCheckbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="anonymousCheckbox" className="text-sm text-gray-700 cursor-pointer select-none">
                  Remain anonymous for this session
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || (!isAnonymous && !name.trim())}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium py-3 rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Entering Safe Space...' : 'Begin Secure Chat'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

