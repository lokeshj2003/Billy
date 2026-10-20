import React, { useState, useRef } from 'react';
import { Send, Paperclip, X, Loader2, Mail, Download } from 'lucide-react';
import { imageProcessingService } from '@/services/gemini/imageProcessing';

interface Props {
  onSendMessage: (message: string, imageFile?: File | null) => void;
  onOpenEmailModal: () => void;
  onDownloadReport: () => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<Props> = ({
  onSendMessage,
  onOpenEmailModal,
  onDownloadReport,
  isLoading,
}) => {
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isExtractingText, setIsExtractingText] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!imageProcessingService.validateImageFile(file)) {
      alert('Please select a valid image file (JPEG, PNG, WEBP) under 10MB.');
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Run OCR via Gemini Vision
    setIsExtractingText(true);
    try {
      const extracted = await imageProcessingService.extractTextFromImage(file);
      if (extracted && !extracted.includes('[No text detected')) {
        setText((prev) => (prev ? `${prev}\n\n[Extracted Screenshot Text]:\n${extracted}` : `[Evidence Screenshot Text]:\n${extracted}`));
      }
    } catch (err) {
      console.warn('OCR extraction warning:', err);
    } finally {
      setIsExtractingText(false);
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = () => {
    if ((!text.trim() && !selectedFile) || isLoading || isExtractingText) return;

    const currentText = text.trim();
    const currentFile = selectedFile;

    // Reset local input state
    setText('');
    handleRemoveImage();

    onSendMessage(currentText, currentFile);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-indigo-100 p-4 bg-white rounded-b-2xl">
      {/* Evidence Image Preview */}
      {previewUrl && (
        <div className="relative inline-block mb-3 p-1.5 bg-indigo-50 border border-indigo-100 rounded-xl">
          <img
            src={previewUrl}
            alt="Evidence preview"
            className="h-20 max-w-xs object-cover rounded-lg shadow-sm"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            aria-label="Remove image"
            className="absolute -top-2 -right-2 p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-md transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {isExtractingText && (
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center text-white text-xs space-x-1.5 font-medium">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing screenshot...</span>
            </div>
          )}
        </div>
      )}

      {/* Input Action Controls */}
      <div className="flex items-end space-x-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          className="hidden"
          id="chat-file-upload"
          disabled={isLoading || isExtractingText}
        />

        <label
          htmlFor="chat-file-upload"
          title="Upload screenshot or evidence image (AI will extract text)"
          className={`p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all cursor-pointer ${
            isLoading ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          <Paperclip className="w-5 h-5" />
        </label>

        <button
          type="button"
          onClick={onOpenEmailModal}
          title="Send Incident Report to Support"
          className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all"
        >
          <Mail className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={onDownloadReport}
          title="Download chat transcript as evidence"
          className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all"
        >
          <Download className="w-5 h-5" />
        </button>

        <div className="flex-1 relative">
          <textarea
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isExtractingText
                ? 'Extracting evidence text...'
                : 'Type what happened or upload a screenshot (Enter to send)...'
            }
            disabled={isLoading}
            className="w-full resize-none px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-gray-900 max-h-32 min-h-[42px]"
          />
        </div>

        <button
          type="button"
          onClick={handleSend}
          disabled={(!text.trim() && !selectedFile) || isLoading || isExtractingText}
          aria-label="Send message"
          className="p-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
