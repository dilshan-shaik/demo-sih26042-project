import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastMessage } from '../../types';

interface ToastContextType {
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(({ title, message, type }: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          const iconMap = {
            success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
            error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
            warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
            info: <Info className="w-5 h-5 text-blue-600 shrink-0" />
          }[toast.type];

          const borderMap = {
            success: 'border-emerald-200 bg-white text-slate-800',
            error: 'border-rose-200 bg-white text-slate-800',
            warning: 'border-amber-200 bg-white text-slate-800',
            info: 'border-blue-200 bg-white text-slate-800'
          }[toast.type];

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all animate-in slide-in-from-bottom-2 ${borderMap}`}
            >
              {iconMap}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-slate-900">{toast.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
