import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, AlertTriangle } from 'lucide-react';
import { ChatMessage, UserProfile } from '@/types/chat';

interface Props {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  userProfile?: UserProfile | null;
}

export const ChatMessageList: React.FC<Props> = ({
  messages,
  isLoading,
  error,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-indigo-50/40 via-white to-white">
      <AnimatePresence initial={false}>
        {messages.map((message, idx) => {
          const isUser = message.role === 'user';
          const time = message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <motion.div
              key={`${message.role}-${idx}-${message.timestamp.getTime()}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                  isUser
                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white'
                    : 'bg-white border border-indigo-100 text-indigo-600 shadow'
                }`}
              >
                {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[80%] md:max-w-[70%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words shadow-sm ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white border border-indigo-100 text-gray-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  {/* Attached Image if present */}
                  {message.imageUrl && (
                    <div className="mb-2.5">
                      <img
                        src={message.imageUrl}
                        alt="Evidence attached"
                        className="rounded-lg max-h-48 w-auto object-cover border border-white/20"
                      />
                    </div>
                  )}

                  {message.content}
                </div>

                {/* Metadata / Distress indicator */}
                <div className={`flex items-center gap-2 px-1 text-[11px] ${isUser ? 'justify-end text-gray-400' : 'text-gray-400'}`}>
                  <span>{time}</span>
                  {message.sentimentScore && message.sentimentScore >= 7 && (
                    <span className="inline-flex items-center text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] font-medium border border-amber-200">
                      <AlertTriangle className="w-3 h-3 mr-0.5" />
                      Priority Support
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Loading Indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 text-indigo-600"
        >
          <div className="w-9 h-9 rounded-xl bg-white border border-indigo-100 flex items-center justify-center shadow-sm">
            <Bot className="w-5 h-5 text-indigo-600 animate-pulse" />
          </div>
          <div className="bg-white border border-indigo-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></span>
          </div>
        </motion.div>
      )}

      {/* Error Notice */}
      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl text-center">
          {error}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};
