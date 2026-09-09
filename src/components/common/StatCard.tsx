import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'blue' | 'teal' | 'indigo' | 'amber';
  badge?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'blue',
  badge
}) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      border: 'border-blue-100',
    },
    teal: {
      bg: 'bg-teal-50',
      iconColor: 'text-teal-600',
      border: 'border-teal-100',
    },
    indigo: {
      bg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      border: 'border-indigo-100',
    },
    amber: {
      bg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      border: 'border-amber-100',
    }
  }[color];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorMap.bg} ${colorMap.border} border`}>
          <Icon className={`w-6 h-6 ${colorMap.iconColor}`} />
        </div>
      </div>
      {badge && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>Target Progress</span>
          <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">{badge}</span>
        </div>
      )}
    </div>
  );
};
