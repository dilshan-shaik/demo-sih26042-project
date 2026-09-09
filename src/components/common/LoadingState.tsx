import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  description?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Processing Content...',
  description = 'Connecting AI pipeline and phonetics mapping',
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-100 ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3 animate-pulse">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
      <h4 className="text-base font-semibold text-slate-900">{message}</h4>
      <p className="text-xs text-slate-500 max-w-sm mt-1">{description}</p>
    </div>
  );
};
