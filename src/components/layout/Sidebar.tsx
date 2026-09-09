import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Mic,
  Languages,
  BookOpen,
  FileText,
  Sparkles,
  CheckCircle,
  Settings,
  LogOut,
  X,
  GraduationCap
} from 'lucide-react';
import { TEACHER_PROFILE } from '../../data/mockData';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Voice Translator', path: '/voice-translator', icon: Mic, badge: 'Demo' },
  { name: 'Text Translator', path: '/text-translator', icon: Languages },
  { name: 'Lessons', path: '/lessons', icon: BookOpen },
  { name: 'Worksheets', path: '/worksheets', icon: FileText },
  { name: 'Flashcards', path: '/flashcards', icon: Sparkles },
  { name: 'Language Validation', path: '/validation', icon: CheckCircle, badge: '7' },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl lg:shadow-none' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-18 flex items-center justify-between px-6 border-b border-slate-100">
          <div 
            onClick={() => { navigate('/'); onClose(); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700 bg-clip-text text-transparent">
                MultimodalText
              </span>
              <span className="block text-[10px] font-bold tracking-wider text-slate-600 uppercase">
                 Tribal Learning
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-600">
            Main Platform
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : item.badge === 'Demo'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Sidebar Footer: Teacher Profile */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60">
          <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={TEACHER_PROFILE.avatar}
                alt={TEACHER_PROFILE.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-100 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{TEACHER_PROFILE.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{TEACHER_PROFILE.role}</p>
              </div>
            </div>

            <button
              onClick={() => {
                navigate('/');
                onClose();
              }}
              title="Return to Public Landing"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
