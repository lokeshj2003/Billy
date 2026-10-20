import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC<{ label?: string }> = ({ label = 'Loading Billy...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-3 text-indigo-200">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </div>
  );
};

