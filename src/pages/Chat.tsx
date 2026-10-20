import React from 'react';
import { motion } from 'framer-motion';
import ChatBot from '@/components/chat/ChatBot';
import { Shield, PhoneCall } from 'lucide-react';

export const Chat: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-300" />
            <span>Chat with Billy</span>
          </h1>
          <p className="text-xs text-indigo-100 mt-0.5">
            Real-time trauma-informed assistance. Upload screenshots or chat directly.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-rose-500/20 text-rose-100 border border-rose-400/30 px-3 py-1.5 rounded-xl self-start sm:self-center">
          <PhoneCall className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
          <span>Immediate Danger? Call <strong>911</strong> or <strong>988</strong></span>
        </div>
      </motion.div>

      {/* Main Bot Widget */}
      <ChatBot />
    </div>
  );
};

export default Chat;

