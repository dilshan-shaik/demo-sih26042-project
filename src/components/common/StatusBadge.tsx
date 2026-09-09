import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, Sparkles } from 'lucide-react';
import { ValidationStatus } from '../../types';

interface StatusBadgeProps {
  status: ValidationStatus | 'Ready' | 'In Review' | 'Draft' | 'Demo' | 'Verified';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  switch (status) {
    case 'Approved':
    case 'Verified':
    case 'Ready':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${sizeClasses}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{status}</span>
        </span>
      );
    case 'Pending Review':
    case 'In Review':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 ${sizeClasses}`}>
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>{status}</span>
        </span>
      );
    case 'Needs Correction':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 ${sizeClasses}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>{status}</span>
        </span>
      );
    case 'Demo':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 ${sizeClasses}`}>
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Demo Only</span>
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses}`}>
          <span>{status}</span>
        </span>
      );
  }
};
