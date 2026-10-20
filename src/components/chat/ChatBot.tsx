import React, { useState } from 'react';
import { Bot, RotateCcw, User, EyeOff, ShieldCheck } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useUserProfile } from '@/hooks/useUserProfile';
import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';
import { UserOnboardingModal } from './UserOnboardingModal';
import { EmailReportModal } from './EmailReportModal';
import { downloadChatReport } from '@/utils/exportReport';

export const ChatBot: React.FC = () => {
  const { messages, isLoading, error, sendMessage, clearChat } = useChat();
  const { profile, isModalOpen, openModal, updateProfile } = useUserProfile();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const handleDownload = () => {
    downloadChatReport(messages, profile);
  };

  return (
    <>
      {/* Onboarding / Name selection modal */}
      <UserOnboardingModal
        isOpen={isModalOpen}
        onSave={updateProfile}
        initialName={profile?.name !== 'Anonymous' ? profile?.name : ''}
        initialAnonymous={profile?.isAnonymous ?? false}
      />

      {/* Incident Escalation Email Modal */}
      <EmailReportModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        messages={messages}
        userProfile={profile}
      />

      {/* Main Chat Container */}
      <div className="flex flex-col h-[650px] bg-white rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 md:px-6 bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-900 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-indigo-900 rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold tracking-tight">Billy</h2>
                <span className="text-[11px] bg-white/15 px-2 py-0.5 rounded-full font-medium text-indigo-100 border border-white/10">
                  AI Bullying Prevention
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Confidential 24/7 Support</span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={openModal}
              title="Identity Settings"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition flex items-center space-x-1.5 border border-white/10"
            >
              {profile?.isAnonymous ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-indigo-200" />
                  <span className="hidden sm:inline">Anonymous</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-indigo-200" />
                  <span className="hidden sm:inline">{profile?.name || 'Set Identity'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={clearChat}
              title="Reset conversation"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/10"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <ChatMessageList
          messages={messages}
          isLoading={isLoading}
          error={error}
          userProfile={profile}
        />

        {/* Chat Input Bar */}
        <ChatInput
          onSendMessage={sendMessage}
          onOpenEmailModal={() => setIsEmailModalOpen(true)}
          onDownloadReport={handleDownload}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default ChatBot;
