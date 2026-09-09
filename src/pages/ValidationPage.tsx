import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  Edit,
  Volume2,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Filter,
  Search,
  MessageSquare,
  Sparkles,
  Check,
  Info
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../components/common/Toast';
import { VALIDATION_ITEMS, LANGUAGES, TEACHER_PROFILE } from '../data/mockData';
import { ValidationItem, ValidationStatus, LanguageCode } from '../types';
import { playSpeech } from '../utils/audio';

export const ValidationPage: React.FC = () => {
  const { showToast } = useToast();

  const [items, setItems] = useState<ValidationItem[]>(VALIDATION_ITEMS);
  const [selectedStatus, setSelectedStatus] = useState<'All' | ValidationStatus>('All');
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Edit / Feedback Modal
  const [editingItem, setEditingItem] = useState<ValidationItem | null>(null);
  const [editCorrection, setEditCorrection] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
      const matchesLang = selectedLang === 'all' || item.targetLanguage === selectedLang;
      const matchesSearch =
        item.hindiSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.aiTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phonetic.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesLang && matchesSearch;
    });
  }, [items, selectedStatus, selectedLang, searchQuery]);

  const handleApprove = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: 'Approved', reviewedBy: `${TEACHER_PROFILE.name} (Teacher)` }
          : item
      )
    );
    showToast({
      title: 'Translation Approved',
      message: 'Verified for classroom teaching materials and official worksheets.',
      type: 'success'
    });
  };

  const handleReject = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: 'Needs Correction', notes: 'Flagged by teacher for regional dialect mismatch.' }
          : item
      )
    );
    showToast({
      title: 'Flagged for Correction',
      message: 'Marked as "Needs Correction" and returned to language specialist queue.',
      type: 'warning'
    });
  };

  const handleOpenEdit = (item: ValidationItem) => {
    setEditingItem(item);
    setEditCorrection(item.suggestedCorrection || item.aiTranslation);
    setEditNotes(item.notes || '');
  };

  const handleSaveCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              aiTranslation: editCorrection,
              notes: editNotes,
              status: 'Approved',
              reviewedBy: `${TEACHER_PROFILE.name} (Teacher & Native Speaker)`
            }
          : item
      )
    );

    showToast({
      title: 'Correction Submitted & Approved',
      message: 'Updated translation with verified teacher phrasings.',
      type: 'success'
    });
    setEditingItem(null);
  };

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Human-in-the-Loop Language Validation
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Teacher Review
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            AI-generated translations are reviewed by teachers and native-language experts before classroom use.
          </p>
        </div>

        {/* Status count pill */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <div className="text-xs">
            <span className="font-bold text-slate-900">
              {items.filter((i) => i.status === 'Approved').length} Verified
            </span>
            <span className="text-slate-400 mx-1.5">•</span>
            <span className="font-bold text-amber-700">
              {items.filter((i) => i.status === 'Pending Review').length} Pending
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search source sentences or translations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-500">Medium:</span>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">All Languages</option>
              <option value="santhali">Santhali</option>
              <option value="ho">Ho</option>
              <option value="mundari">Mundari</option>
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto scrollbar-none">
          {(['All', 'Pending Review', 'Approved', 'Needs Correction'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedStatus === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {st}
              <span className="ml-1.5 opacity-70 text-[10px]">
                ({st === 'All' ? items.length : items.filter((i) => i.status === st).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Validation Queue List */}
      {filteredItems.length === 0 ? (
        <EmptyState
          icon={CheckCircle2}
          title="No validation items in this view"
          description="All submissions matching your current filter have been evaluated."
          actionLabel="Show All Items"
          onAction={() => {
            setSelectedStatus('All');
            setSelectedLang('all');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const langObj = LANGUAGES.find((l) => l.id === item.targetLanguage);

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4 text-left"
              >
                {/* Item Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={item.status} />
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Target: {langObj?.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      AI Confidence: {item.confidenceScore}%
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.submittedDate}
                  </span>
                </div>

                {/* Source & AI Output Side-by-Side Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Hindi Source */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Hindi Source Sentence:
                    </span>
                    <p className="text-base font-bold text-slate-900 font-['Noto_Sans_Devanagari']">
                      "{item.hindiSource}"
                    </p>
                  </div>

                  {/* AI Generated Output */}
                  <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">
                        AI Translation ({langObj?.name}):
                      </span>
                      <button
                        onClick={() => playSpeech(item.phonetic, 'hi-IN')}
                        className="p-1 rounded-md text-teal-700 hover:bg-teal-100"
                        title="Listen to audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-base font-bold text-slate-900">
                      {item.aiTranslation}
                    </p>
                    <p className="text-xs text-teal-800 italic mt-0.5">
                      "{item.phonetic}"
                    </p>
                  </div>
                </div>

                {/* Teacher / Dialect Notes */}
                {item.notes && (
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-2 text-xs text-amber-900">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Reviewer Note: </span>
                      <span>{item.notes}</span>
                      {item.reviewedBy && (
                        <span className="block text-[11px] text-amber-800/80 mt-0.5">
                          — Reviewed by {item.reviewedBy}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => playSpeech(item.phonetic, 'hi-IN')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Audio Preview</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status !== 'Approved' && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleApprove(item.id)}
                        icon={<CheckCircle2 className="w-4 h-4" />}
                      >
                        Approve
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEdit(item)}
                      icon={<Edit className="w-3.5 h-3.5" />}
                    >
                      Edit Correction
                    </Button>

                    {item.status !== 'Needs Correction' && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleReject(item.id)}
                        icon={<XCircle className="w-4 h-4" />}
                      >
                        Reject
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Correction Modal */}
      {editingItem && (
        <Modal
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          title="Edit & Validate Translation"
          subtitle="Human-in-the-loop teacher linguistic refinement"
          maxWidth="lg"
        >
          <form onSubmit={handleSaveCorrection} className="space-y-4 text-left">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Hindi Source Sentence
              </span>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-800 font-['Noto_Sans_Devanagari']">
                {editingItem.hindiSource}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Corrected Tribal Translation ({LANGUAGES.find(l => l.id === editingItem.targetLanguage)?.name})
              </label>
              <textarea
                required
                rows={3}
                value={editCorrection}
                onChange={(e) => setEditCorrection(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dialect Feedback & Cultural Context Notes
              </label>
              <textarea
                rows={3}
                placeholder="Explain why this phrased correction is more appropriate for primary students in this district..."
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="p-3 rounded-xl bg-blue-50 text-blue-900 text-xs">
              <span className="font-semibold">Reviewer Signature: </span>
              <span>{TEACHER_PROFILE.name} ({TEACHER_PROFILE.school})</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setEditingItem(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
              >
                Save & Approve Translation
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
