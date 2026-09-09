import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Languages,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { TEACHER_PROFILE, LANGUAGES } from '../../data/mockData';

interface NavbarProps {
  onToggleSidebar: () => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

const routeTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Teacher Dashboard', subtitle: 'Overview of student lessons & worksheets' },
  '/voice-translator': { title: 'Voice Translator', subtitle: 'Speech-to-speech classroom translation' },
  '/text-translator': { title: 'Text Translator', subtitle: 'Bidirectional tribal language translation' },
  '/lessons': { title: 'Lesson Library', subtitle: 'Curated bilingual primary school lessons' },
  '/worksheets': { title: 'Worksheet Studio', subtitle: 'Generate and print classroom activities' },
  '/flashcards': { title: 'Interactive Flashcards', subtitle: 'Visual & phonetic vocabulary practice' },
  '/validation': { title: 'Language Validation Queue', subtitle: 'Teacher-in-the-loop expert review' },
  '/settings': { title: 'Platform Settings', subtitle: 'Preferences & future offline roadmap' },
};

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  selectedLanguage,
  onSelectLanguage
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentInfo = routeTitles[location.pathname] || {
    title: 'MultimodalText',
    subtitle: 'AI-Powered Tribal Learning'
  };

  const notifications = [
    { id: '1', title: 'New Translation Approved', desc: 'Santhali counting lesson is ready for classroom use', time: '10m ago', unread: true },
    { id: '2', title: 'Ho Validation Requested', desc: 'Grammar review submitted for classroom commands', time: '1h ago', unread: true },
    { id: '3', title: 'New Worksheet Available', desc: 'Animals & Birds matching sheet generated', time: 'Yesterday', unread: false },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/lessons?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-30 h-18 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left side: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {currentInfo.title}
            </h2>
            <span className="hidden sm:inline-flex text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
               Prototype
            </span>
          </div>
          <p className="hidden md:block text-xs text-slate-500 truncate">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right side: Search, Language Picker, Notifications, Teacher */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search Field */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search lessons, worksheets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 lg:w-64 pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100/80 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white transition-all"
          />
        </form>

        {/* Target Tribal Language Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100/90 border border-slate-200/80 rounded-xl px-2 py-1">
          <Languages className="w-4 h-4 text-blue-600 shrink-0" />
          <select
            value={selectedLanguage}
            onChange={(e) => onSelectLanguage(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer pr-1"
          >
            {LANGUAGES.filter(l => l.id !== 'hindi').map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 z-50 animate-in fade-in-50 zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">2 unread</span>
              </div>
              <div className="py-2 space-y-1.5">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2 rounded-xl text-left transition-colors cursor-pointer ${
                      n.unread ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => { setShowNotifications(false); navigate('/validation'); }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  View Validation Queue →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Teacher profile pill */}
        <div 
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-100/80 hover:bg-slate-200/60 border border-slate-200/60 transition-colors cursor-pointer"
        >
          <img
            src={TEACHER_PROFILE.avatar}
            alt={TEACHER_PROFILE.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-white"
          />
          <span className="text-xs font-semibold text-slate-800 hidden sm:inline">
            {TEACHER_PROFILE.name}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
        </div>
      </div>
    </header>
  );
};
