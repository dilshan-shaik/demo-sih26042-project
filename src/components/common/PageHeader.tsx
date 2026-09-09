import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  children
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
          {badge && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-slate-600 max-w-2xl">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {children}
        </div>
      )}
    </div>
  );
};
