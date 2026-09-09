import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  Sparkles,
  CheckCircle2,
  Mic,
  PlusCircle,
  Clock,
  ArrowUpRight,
  GraduationCap,
  Calendar,
  Languages,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { StatCard } from '../components/common/StatCard';
import { Button } from '../components/common/Button';
import {
  TEACHER_PROFILE,
  SUMMARY_STATS,
  RECENT_ACTIVITIES,
  PARTICIPATION_CHART_DATA,
  LESSONS_COMPLETED_DATA,
  WORKSHEET_USAGE_DATA
} from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-xs text-blue-100">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{TEACHER_PROFILE.school} • {TEACHER_PROFILE.district}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Good morning, {TEACHER_PROFILE.name}
            </h1>
            <p className="text-blue-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              Continue creating meaningful learning content for your students.
            </p>
          </div>

          {/* Primary Quick CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="md"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-xs backdrop-blur-xs"
              onClick={() => navigate('/voice-translator')}
              icon={<Mic className="w-4 h-4" />}
            >
              Voice Translator
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="bg-teal-500 hover:bg-teal-400 text-white font-semibold shadow-md"
              onClick={() => navigate('/worksheets')}
              icon={<PlusCircle className="w-4 h-4" />}
            >
              New Worksheet
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Lessons"
          value={SUMMARY_STATS.totalLessons}
          subtitle="4 curriculum topics covered"
          icon={BookOpen}
          color="blue"
          badge="85% of Term 1"
        />
        <StatCard
          title="Worksheets Created"
          value={SUMMARY_STATS.worksheetsCreated}
          subtitle="Bilingual matching & fill-ins"
          icon={FileText}
          color="teal"
          badge="18 Ready to print"
        />
        <StatCard
          title="Flashcards Available"
          value={SUMMARY_STATS.flashcardsAvailable}
          subtitle="Audio-enabled vocabulary words"
          icon={Sparkles}
          color="indigo"
          badge="Active in class"
        />
        <StatCard
          title="Pending Validations"
          value={SUMMARY_STATS.pendingValidations}
          subtitle="Community review queue"
          icon={CheckCircle2}
          color="amber"
          badge="Action needed"
        />
      </div>

      {/* Quick Actions Grid */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>
          <span className="text-xs text-slate-500">Shortcut tools for educators</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/voice-translator')}
            className="flex items-start gap-3 p-4 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-200 transition-all text-left cursor-pointer group"
          >
            <div className="p-2.5 rounded-lg bg-blue-600 text-white group-hover:scale-105 transition-transform">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Translate Lesson</h3>
              <p className="text-xs text-slate-500 mt-0.5">Voice or text input with live Santhali speech</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/worksheets')}
            className="flex items-start gap-3 p-4 rounded-xl border border-teal-100 bg-teal-50/50 hover:bg-teal-50 hover:border-teal-200 transition-all text-left cursor-pointer group"
          >
            <div className="p-2.5 rounded-lg bg-teal-600 text-white group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700">Create Worksheet</h3>
              <p className="text-xs text-slate-500 mt-0.5">Printable dual-language exercise sheets</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/flashcards')}
            className="flex items-start gap-3 p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-200 transition-all text-left cursor-pointer group"
          >
            <div className="p-2.5 rounded-lg bg-indigo-600 text-white group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700">Create Flashcards</h3>
              <p className="text-xs text-slate-500 mt-0.5">Interactive cards with Ol Chiki phonetics</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/validation')}
            className="flex items-start gap-3 p-4 rounded-xl border border-amber-100 bg-amber-50/50 hover:bg-amber-50 hover:border-amber-200 transition-all text-left cursor-pointer group"
          >
            <div className="p-2.5 rounded-lg bg-amber-600 text-white group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700">Validate Translation</h3>
              <p className="text-xs text-slate-500 mt-0.5">Human review queue for pending AI output</p>
            </div>
          </button>
        </div>
      </div>

      {/* Analytics Charts & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols: Recharts Visualizations */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Chart 1: Student Participation by Language Medium */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Student Participation Across Tribal Mediums</h3>
                <p className="text-xs text-slate-500">Weekly active student engagements by mother-tongue channel</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>Current Week (Mon–Sat)</span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PARTICIPATION_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '12px', fontSize: '12px' }} />
                  <Bar dataKey="santhali" name="Santhali (Ol Chiki)" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ho" name="Ho (Warang Citi)" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="mundari" name="Mundari" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Lessons Completed Trend */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Lessons Completed vs. Target</h3>
                <p className="text-xs text-slate-500">Monthly progression of bilingual classroom units</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                +28% this month
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={LESSONS_COMPLETED_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="week" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '12px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="completed" name="Completed Units" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="target" name="Curriculum Target" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Worksheet Usage & Recent Activity */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Chart 3: Worksheet Usage Breakdown */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1">Worksheet Subject Usage</h3>
            <p className="text-xs text-slate-500 mb-4">Distribution of printed & interactive exercises</p>

            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={WORKSHEET_USAGE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {WORKSHEET_USAGE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100">
              {WORKSHEET_USAGE_DATA.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                  <span className="text-slate-600 truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity List */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
              <Activity className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-4">
              {RECENT_ACTIVITIES.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-left">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900">{act.action}</p>
                    <p className="text-[11px] text-slate-500 leading-snug truncate">{act.detail}</p>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {act.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => navigate('/lessons')}
              >
                View Full Activity Log
              </Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
