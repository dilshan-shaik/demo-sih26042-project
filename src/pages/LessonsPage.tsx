import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Filter,
  Plus,
  Clock,
  Layers,
  Languages,
  Eye,
  Edit,
  Share2,
  Bookmark,
  CheckCircle2,
  FileText,
  Volume2
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { AudioPlayer } from '../components/common/AudioPlayer';
import { StatusBadge } from '../components/common/StatusBadge';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../components/common/Toast';
import { LESSONS_LIST, LANGUAGES } from '../data/mockData';
import { Lesson, LessonCategory, LanguageCode } from '../types';

const CATEGORIES: ('All' | LessonCategory)[] = [
  'All',
  'Counting',
  'Fruits',
  'Animals',
  'Colors',
  'Classroom Objects'
];

export const LessonsPage: React.FC = () => {
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';

  const [lessons, setLessons] = useState<Lesson[]>(LESSONS_LIST);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<'All' | LessonCategory>('All');
  const [selectedLang, setSelectedLang] = useState<string>('all');

  // Preview Modal
  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null);

  // Create/Edit Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newHindiTitle, setNewHindiTitle] = useState('');
  const [newCategory, setNewCategory] = useState<LessonCategory>('Counting');
  const [newLanguage, setNewLanguage] = useState<LanguageCode>('santhali');
  const [newHindiContent, setNewHindiContent] = useState('');

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesSearch =
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
      const matchesLang = selectedLang === 'all' || lesson.targetLanguage === selectedLang;

      return matchesSearch && matchesCategory && matchesLang;
    });
  }, [lessons, searchQuery, selectedCategory, selectedLang]);

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newHindiContent.trim()) {
      showToast({
        title: 'Fields required',
        message: 'Please provide lesson title and content.',
        type: 'warning'
      });
      return;
    }

    const created: Lesson = {
      id: `les-${Date.now()}`,
      title: newTitle,
      hindiTitle: newHindiTitle || newTitle,
      targetLanguage: newLanguage,
      category: newCategory,
      duration: '15 mins',
      activitiesCount: 3,
      description: `New bilingual unit for primary grades focusing on ${newCategory}.`,
      objectives: [
        'Understand foundational vocabulary in both Hindi and mother tongue',
        'Reinforce classroom pronunciation through oral repetition',
        'Complete bilingual practice exercises'
      ],
      hindiContent: newHindiContent,
      translatedContent: {
        scriptText: `[Ol Chiki Translation for: ${newHindiContent.slice(0, 40)}...]`,
        phoneticText: 'Phonetic mother-tongue transcription (Demo)',
        meaning: newHindiContent
      },
      audioDuration: '01:30',
      status: 'Ready',
      createdAt: 'Just now'
    };

    setLessons([created, ...lessons]);
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewHindiTitle('');
    setNewHindiContent('');

    showToast({
      title: 'Lesson Created',
      message: `"${created.title}" added to your curriculum repository.`,
      type: 'success'
    });
  };

  const handleShareLesson = (lesson: Lesson) => {
    showToast({
      title: 'Lesson Shared',
      message: `Direct link and QR code generated for "${lesson.title}".`,
      type: 'info'
    });
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Bilingual Lesson Library
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {lessons.length} Units
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Structured primary school lesson plans integrating Hindi curriculum concepts with mother-tongue scripts and audio.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsCreateModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Create Lesson
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by lesson title or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Language filter */}
          <div className="flex items-center gap-2 self-start md:self-auto w-full md:w-auto">
            <Languages className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs font-bold text-slate-500">Medium:</span>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">All Languages</option>
              <option value="santhali">Santhali (Ol Chiki)</option>
              <option value="ho">Ho (Warang Citi)</option>
              <option value="mundari">Mundari (Nagari)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 mr-1 uppercase tracking-wider shrink-0">Topics:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Cards Grid */}
      {filteredLessons.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No lessons found"
          description="Try modifying your category filters or search keywords."
          actionLabel="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('All');
            setSelectedLang('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => {
            const langObj = LANGUAGES.find(l => l.id === lesson.targetLanguage);
            return (
              <div
                key={lesson.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Category & Language Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {lesson.category}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                      {langObj?.name}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{lesson.title}</h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5 font-['Noto_Sans_Devanagari']">
                      {lesson.hindiTitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {lesson.description}
                  </p>

                  {/* Meta stats */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      {lesson.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-teal-600" />
                      {lesson.activitiesCount} Activities
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <StatusBadge status={lesson.status} size="sm" />

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewLesson(lesson)}
                      icon={<Eye className="w-3.5 h-3.5" />}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        showToast({
                          title: 'Editing Unit',
                          message: `Opening editor for "${lesson.title}".`,
                          type: 'info'
                        });
                      }}
                      icon={<Edit className="w-3.5 h-3.5" />}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lesson Preview Modal */}
      {previewLesson && (
        <Modal
          isOpen={!!previewLesson}
          onClose={() => setPreviewLesson(null)}
          title={previewLesson.title}
          subtitle={`Hindi & ${LANGUAGES.find(l => l.id === previewLesson.targetLanguage)?.name} Curriculum Unit`}
          maxWidth="2xl"
          actions={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-500">Duration: {previewLesson.duration}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShareLesson(previewLesson)}
                  icon={<Share2 className="w-3.5 h-3.5" />}
                >
                  Share
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    showToast({
                      title: 'Curriculum Unit Saved',
                      message: `"${previewLesson.title}" marked as ready for class.`,
                      type: 'success'
                    });
                    setPreviewLesson(null);
                  }}
                  icon={<Bookmark className="w-3.5 h-3.5" />}
                >
                  Save Unit
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-6 text-left">
            {/* Objectives */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Learning Objectives
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {previewLesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hindi Content */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Teacher Hindi Script & Explanations
              </span>
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-sm text-slate-800 leading-relaxed font-['Noto_Sans_Devanagari']">
                {previewLesson.hindiContent}
              </div>
            </div>

            {/* Translated Mother Tongue Content */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                  Translated Content ({LANGUAGES.find(l => l.id === previewLesson.targetLanguage)?.name})
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                  Verified Script
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2">
                <p className="text-lg font-bold text-slate-900 leading-relaxed">
                  {previewLesson.translatedContent.scriptText}
                </p>
                <div className="pt-2 border-t border-teal-100">
                  <p className="text-xs text-teal-900 italic">
                    "{previewLesson.translatedContent.phoneticText}"
                  </p>
                </div>
              </div>
            </div>

            {/* Native Audio */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>Classroom Audio Player</span>
              </span>
              <AudioPlayer
                textToSpeak={previewLesson.translatedContent.phoneticText}
                title={`${previewLesson.title} Audio`}
                durationLabel={previewLesson.audioDuration}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Create Lesson Modal */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Bilingual Lesson"
          subtitle="Define pedagogical goals and bilingual lesson content"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateLesson} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Lesson Title (English)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Village Birds & Forest Trees"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hindi Curriculum Title
              </label>
              <input
                type="text"
                placeholder="e.g. हमारे जंगल के पक्षी"
                value={newHindiTitle}
                onChange={(e) => setNewHindiTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Noto_Sans_Devanagari']"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Topic Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as LessonCategory)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Counting">Counting</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Animals">Animals</option>
                  <option value="Colors">Colors</option>
                  <option value="Classroom Objects">Classroom Objects</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Tribal Medium
                </label>
                <select
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value as LanguageCode)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="santhali">Santhali (Ol Chiki)</option>
                  <option value="ho">Ho (Warang Citi)</option>
                  <option value="mundari">Mundari (Nagari)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Teacher Hindi Explanation
              </label>
              <textarea
                required
                rows={4}
                placeholder="Enter teacher instruction text in Hindi..."
                value={newHindiContent}
                onChange={(e) => setNewHindiContent(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Noto_Sans_Devanagari']"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
              >
                Save & Generate Translation
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
