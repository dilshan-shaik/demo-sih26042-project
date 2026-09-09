import React, { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Printer,
  Download,
  Eye,
  Edit,
  Volume2,
  CheckCircle2,
  Apple,
  Droplets,
  Home,
  Trees,
  Sun,
  Hash,
  BookOpen,
  PawPrint,
  Flower2,
  Palette
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../components/common/Toast';
import { WORKSHEETS_LIST, LANGUAGES, TEACHER_PROFILE } from '../data/mockData';
import { Worksheet, LessonCategory, LanguageCode } from '../types';
import { playSpeech } from '../utils/audio';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Apple,
  Droplets,
  Home,
  Trees,
  Sun,
  Hash,
  BookOpen,
  PawPrint,
  Flower2,
  Palette,
  CheckCircle2
};

const TOPICS: ('All' | LessonCategory)[] = [
  'All',
  'Counting',
  'Fruits',
  'Animals',
  'Colors',
  'Classroom Objects'
];

export const WorksheetsPage: React.FC = () => {
  const { showToast } = useToast();

  const [worksheets, setWorksheets] = useState<Worksheet[]>(WORKSHEETS_LIST);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<'All' | LessonCategory>('All');
  const [previewWorksheet, setPreviewWorksheet] = useState<Worksheet | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New worksheet fields
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState<LessonCategory>('Counting');
  const [newLang, setNewLang] = useState<LanguageCode>('santhali');
  const [newGrade, setNewGrade] = useState('Grade 1 & 2');

  const filteredWorksheets = useMemo(() => {
    return worksheets.filter((ws) => {
      const matchesSearch = ws.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTopic = selectedTopic === 'All' || ws.topic === selectedTopic;
      return matchesSearch && matchesTopic;
    });
  }, [worksheets, searchQuery, selectedTopic]);

  const handlePrint = () => {
    window.print();
  };

  const handleCreateWorksheet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Worksheet = {
      id: `ws-${Date.now()}`,
      title: newTitle,
      topic: newTopic,
      targetLanguage: newLang,
      grade: newGrade,
      estimatedTime: '20 mins',
      createdDate: 'Just now',
      vocabulary: [
        { hindi: 'सूरज', tribal: 'ᱥᱤᱧ ᱵᱮᱲᱟ', phonetic: 'Siñ Beda', iconName: 'Sun' },
        { hindi: 'पेड़', tribal: 'ᱫᱟᱨᱮ', phonetic: 'Dare', iconName: 'Trees' },
        { hindi: 'पानी', tribal: 'ᱫᱟᱜ', phonetic: 'Daah', iconName: 'Droplets' }
      ],
      matchingPairs: [
        { id: `m-${Date.now()}-1`, hindi: 'सूरज (Sun)', tribal: 'ᱥᱤᱧ ᱵᱮᱲᱟ (Siñ Beda)', phonetic: 'Siñ Beda', iconName: 'Sun' },
        { id: `m-${Date.now()}-2`, hindi: 'पेड़ (Tree)', tribal: 'ᱫᱟᱨᱮ (Dare)', phonetic: 'Dare', iconName: 'Trees' }
      ],
      fillInBlanks: [
        {
          id: `fib-${Date.now()}-1`,
          promptHindi: 'पेड़ का संथाली शब्द चुनें:',
          sentenceWithBlank: 'पेड़ हमें छाया देता है = _____ (dare) umul emoga',
          correctAnswer: 'ᱫᱟᱨᱮ (Dare)',
          options: ['ᱫᱟᱨᱮ (Dare)', 'ᱫᱟᱜ (Daah)', 'ᱩᱞ (Ul)']
        }
      ]
    };

    setWorksheets([created, ...worksheets]);
    setIsCreateModalOpen(false);
    setNewTitle('');

    showToast({
      title: 'Worksheet Generated',
      message: `"${created.title}" ready with matching exercises and fill-in-the-blanks.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Classroom Worksheet Studio
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              Printable Activities
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Generate printable bilingual worksheets with Hindi prompts, mother-tongue vocabulary, matching columns, and pronunciation aids.
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={() => setIsCreateModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Create Worksheet
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search worksheets by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <span className="text-xs text-slate-500 self-end sm:self-center">
            Showing {filteredWorksheets.length} worksheets
          </span>
        </div>

        {/* Topics filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 mr-1 uppercase tracking-wider shrink-0">Topics:</span>
          {TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedTopic === topic
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Worksheets Grid */}
      {filteredWorksheets.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No worksheets found"
          description="Try selecting a different topic or resetting your search filter."
          actionLabel="View All Worksheets"
          onAction={() => {
            setSearchQuery('');
            setSelectedTopic('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredWorksheets.map((ws) => {
            const langObj = LANGUAGES.find((l) => l.id === ws.targetLanguage);

            return (
              <div
                key={ws.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {ws.topic}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                      {langObj?.name} Medium
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">{ws.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                    <span>{ws.grade}</span>
                    <span>•</span>
                    <span>Est. {ws.estimatedTime}</span>
                    <span>•</span>
                    <span>{ws.matchingPairs.length} Matching + {ws.fillInBlanks.length} Blanks</span>
                  </div>

                  {/* Vocabulary Item Preview Chips with Pronunciation Button */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Featured Words in Sheet:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {ws.vocabulary.slice(0, 4).map((vocab, i) => {
                        const IconComp = iconMap[vocab.iconName] || BookOpen;
                        return (
                          <div
                            key={i}
                            className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/70"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="p-1 rounded-md bg-blue-50 text-blue-600">
                                <IconComp className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-800 truncate">{vocab.hindi}</p>
                                <p className="text-[11px] text-teal-700 font-medium truncate">
                                  {vocab.tribal} ({vocab.phonetic})
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => playSpeech(vocab.phonetic, 'hi-IN')}
                              className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                              title="Listen to pronunciation"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Worksheet Card Action Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setPreviewWorksheet(ws)}
                      icon={<Eye className="w-3.5 h-3.5" />}
                    >
                      Preview Sheet
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPreviewWorksheet(ws);
                        setTimeout(() => handlePrint(), 300);
                      }}
                      icon={<Printer className="w-3.5 h-3.5" />}
                    >
                      Print
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      showToast({
                        title: 'Edit Mode',
                        message: `Opened editor for "${ws.title}".`,
                        type: 'info'
                      });
                    }}
                    icon={<Edit className="w-3.5 h-3.5" />}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Printable Worksheet Preview Modal */}
      {previewWorksheet && (
        <Modal
          isOpen={!!previewWorksheet}
          onClose={() => setPreviewWorksheet(null)}
          title="Printable Worksheet Preview"
          subtitle="Ready for classroom black-and-white or color printing"
          maxWidth="4xl"
          actions={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-500">Target: {LANGUAGES.find(l => l.id === previewWorksheet.targetLanguage)?.name} Medium</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewWorksheet(null)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handlePrint}
                  icon={<Printer className="w-4 h-4" />}
                >
                  Print Worksheet
                </Button>
              </div>
            </div>
          }
        >
          {/* Paper styling container */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-300 text-slate-900 space-y-6 font-sans">
            {/* School Header */}
            <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
              <h2 className="text-xl font-black uppercase tracking-wider text-slate-900">
                {TEACHER_PROFILE.school}
              </h2>
              <p className="text-xs font-semibold text-slate-600">
                District: {TEACHER_PROFILE.district}, {TEACHER_PROFILE.state} • Smart India Hackathon Bilingual Learning Initiative
              </p>
              <h3 className="text-base font-bold text-slate-800 pt-1">
                {previewWorksheet.title} ({LANGUAGES.find(l => l.id === previewWorksheet.targetLanguage)?.name} Medium)
              </h3>
            </div>

            {/* Student Info Lines */}
            <div className="grid grid-cols-3 gap-4 text-xs font-medium border-b border-slate-200 pb-4">
              <div>
                <span className="font-bold">Student Name:</span> ______________________
              </div>
              <div>
                <span className="font-bold">Roll No.:</span> _________
              </div>
              <div>
                <span className="font-bold">Date:</span> ________________
              </div>
            </div>

            {/* Activity 1: Word Vocabulary Table with Pronunciation */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Activity 1: Vocabulary Guide (शब्द-संग्रह)
                </h4>
                <span className="text-[11px] text-slate-500">Read aloud and practice with teacher</span>
              </div>

              <div className="border border-slate-300 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 border-b border-slate-300 font-bold text-slate-800">
                    <tr>
                      <th className="p-2.5">Icon</th>
                      <th className="p-2.5">Hindi Word</th>
                      <th className="p-2.5">Tribal Script (Ol Chiki)</th>
                      <th className="p-2.5">Phonetic Pronunciation</th>
                      <th className="p-2.5 text-center">Audio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {previewWorksheet.vocabulary.map((vocab, i) => {
                      const IconComp = iconMap[vocab.iconName] || BookOpen;
                      return (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-2.5">
                            <IconComp className="w-4 h-4 text-slate-700" />
                          </td>
                          <td className="p-2.5 font-bold font-['Noto_Sans_Devanagari']">{vocab.hindi}</td>
                          <td className="p-2.5 font-bold text-slate-900 text-sm">{vocab.tribal}</td>
                          <td className="p-2.5 italic text-slate-600">{vocab.phonetic}</td>
                          <td className="p-2.5 text-center">
                            <button
                              onClick={() => playSpeech(vocab.phonetic, 'hi-IN')}
                              className="p-1 rounded-md hover:bg-slate-200 text-slate-600"
                              title="Play word sound"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity 2: Matching Activity */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Activity 2: Match the Pairs (जोड़ी मिलाएँ)
              </h4>
              <p className="text-xs text-slate-600">
                Draw a line connecting the Hindi word on the left with its mother-tongue translation on the right:
              </p>

              <div className="grid grid-cols-2 gap-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
                {/* Left Column */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 block pb-1 border-b border-slate-200">
                    Hindi Words (Column A)
                  </span>
                  {previewWorksheet.matchingPairs.map((pair, idx) => (
                    <div
                      key={pair.id}
                      className="p-2.5 rounded-lg bg-white border border-slate-300 text-xs font-bold flex items-center justify-between"
                    >
                      <span>{idx + 1}. {pair.hindi}</span>
                      <span className="w-3 h-3 rounded-full border-2 border-slate-400" />
                    </div>
                  ))}
                </div>

                {/* Right Column (shuffled order for challenge) */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 block pb-1 border-b border-slate-200">
                    Tribal Words (Column B)
                  </span>
                  {[...previewWorksheet.matchingPairs].reverse().map((pair, idx) => (
                    <div
                      key={pair.id}
                      className="p-2.5 rounded-lg bg-white border border-slate-300 text-xs font-bold flex items-center justify-between text-teal-800"
                    >
                      <span className="w-3 h-3 rounded-full border-2 border-slate-400" />
                      <span>{String.fromCharCode(65 + idx)}. {pair.tribal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity 3: Fill-in-the-Blanks */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Activity 3: Fill in the Blank (रिक्त स्थान भरें)
              </h4>
              <div className="space-y-3">
                {previewWorksheet.fillInBlanks.map((fib, i) => (
                  <div key={fib.id} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
                    <p className="text-xs font-medium text-slate-600">
                      Q{i + 1}. {fib.promptHindi}
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {fib.sentenceWithBlank}
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-xs text-slate-400 font-semibold">Options:</span>
                      {fib.options.map((opt, oIdx) => (
                        <span
                          key={oIdx}
                          className="text-xs px-2.5 py-1 rounded-md bg-slate-100 border border-slate-300 font-medium"
                        >
                          ( ) {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teacher Signature Footer */}
            <div className="pt-6 border-t border-slate-300 flex items-center justify-between text-xs text-slate-600 font-semibold">
              <span>Teacher Review: ______________________</span>
              <span>Grade Score: ______ / 10</span>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Worksheet Modal */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Worksheet"
          subtitle="Generate tailored matching exercises for your class"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateWorksheet} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Worksheet Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Nature Objects & Forest Animals Explorer"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Topic Category
                </label>
                <select
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value as LessonCategory)}
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
                  Target Language
                </label>
                <select
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value as LanguageCode)}
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
                Class Grade
              </label>
              <input
                type="text"
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                variant="secondary"
                size="sm"
                type="submit"
              >
                Generate Exercises
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
