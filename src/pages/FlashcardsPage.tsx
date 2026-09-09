import React, { useState } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Volume2,
  Plus,
  Edit,
  Trash2,
  Play,
  CheckCircle2,
  XCircle,
  Apple,
  Droplets,
  Home,
  Trees,
  Sun,
  BookOpen,
  PawPrint,
  Palette,
  Shuffle,
  Award
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { useToast } from '../components/common/Toast';
import { FLASHCARDS_LIST } from '../data/mockData';
import { Flashcard } from '../types';
import { playSpeech, playChime } from '../utils/audio';

const iconComponents: Record<string, React.FC<{ className?: string }>> = {
  Apple,
  Droplets,
  Home,
  Trees,
  Sun,
  BookOpen,
  PawPrint,
  Palette
};

export const FlashcardsPage: React.FC = () => {
  const { showToast } = useToast();

  const [flashcards, setFlashcards] = useState<Flashcard[]>(FLASHCARDS_LIST);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<string | null>(null);
  const [practiceFeedback, setPracticeFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form fields
  const [formHindi, setFormHindi] = useState('');
  const [formTribal, setFormTribal] = useState('');
  const [formPhonetic, setFormPhonetic] = useState('');
  const [formEnglish, setFormEnglish] = useState('');
  const [formCategory, setFormCategory] = useState('Nature');

  const currentCard = flashcards[currentIndex];
  const IconComponent = currentCard ? iconComponents[currentCard.iconName] || BookOpen : BookOpen;

  const handleNext = () => {
    setIsFlipped(false);
    setSelectedPracticeOption(null);
    setPracticeFeedback(null);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setSelectedPracticeOption(null);
    setPracticeFeedback(null);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handlePronounce = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentCard) {
      playSpeech(currentCard.phonetic, 'hi-IN');
    }
  };

  const handleDelete = () => {
    if (flashcards.length <= 1) {
      showToast({
        title: 'Cannot delete',
        message: 'At least one flashcard must remain in the deck.',
        type: 'warning'
      });
      return;
    }
    const cardToDelete = flashcards[currentIndex];
    const updated = flashcards.filter((_, i) => i !== currentIndex);
    setFlashcards(updated);
    setCurrentIndex(Math.max(0, currentIndex - 1));
    setIsFlipped(false);
    showToast({
      title: 'Flashcard Deleted',
      message: `Removed "${cardToDelete.hindiWord}" from deck.`,
      type: 'info'
    });
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formHindi.trim() || !formTribal.trim()) return;

    const newCard: Flashcard = {
      id: `fc-${Date.now()}`,
      hindiWord: formHindi,
      tribalWord: formTribal,
      phonetic: formPhonetic || formTribal,
      englishMeaning: formEnglish || formHindi,
      category: formCategory,
      iconName: 'Sparkles',
      sampleSentenceHindi: `यह ${formHindi} है।`,
      sampleSentenceTribal: `ᱱᱚᱣᱟ ᱫᱚ ${formTribal} ᱠᱟᱱᱟ᱾`
    };

    setFlashcards([...flashcards, newCard]);
    setCurrentIndex(flashcards.length);
    setIsAddModalOpen(false);
    setFormHindi('');
    setFormTribal('');
    setFormPhonetic('');
    setFormEnglish('');

    showToast({
      title: 'Flashcard Added',
      message: `"${newCard.hindiWord}" added to the learning deck.`,
      type: 'success'
    });
  };

  const handleEditCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCard) return;

    const updated = [...flashcards];
    updated[currentIndex] = {
      ...currentCard,
      hindiWord: formHindi || currentCard.hindiWord,
      tribalWord: formTribal || currentCard.tribalWord,
      phonetic: formPhonetic || currentCard.phonetic,
      englishMeaning: formEnglish || currentCard.englishMeaning,
      category: formCategory || currentCard.category
    };

    setFlashcards(updated);
    setIsEditModalOpen(false);
    showToast({
      title: 'Card Updated',
      message: 'Flashcard details saved successfully.',
      type: 'success'
    });
  };

  const openEditModal = () => {
    if (!currentCard) return;
    setFormHindi(currentCard.hindiWord);
    setFormTribal(currentCard.tribalWord);
    setFormPhonetic(currentCard.phonetic);
    setFormEnglish(currentCard.englishMeaning);
    setFormCategory(currentCard.category);
    setIsEditModalOpen(true);
  };

  // Practice options generation
  const practiceOptions = React.useMemo(() => {
    if (!currentCard) return [];
    const others = flashcards.filter(f => f.id !== currentCard.id).map(f => f.tribalWord);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 2);
    return [currentCard.tribalWord, ...shuffledOthers].sort(() => 0.5 - Math.random());
  }, [currentCard, flashcards]);

  const handleAnswerPractice = (option: string) => {
    if (!currentCard || selectedPracticeOption) return;
    setSelectedPracticeOption(option);

    if (option === currentCard.tribalWord) {
      setPracticeFeedback('correct');
      setPracticeScore(prev => prev + 1);
      playChime(659.25, 0.4);
      showToast({
        title: 'Correct!',
        message: `${currentCard.hindiWord} translates to ${currentCard.tribalWord} (${currentCard.phonetic})`,
        type: 'success'
      });
    } else {
      setPracticeFeedback('wrong');
      playChime(220, 0.5);
      showToast({
        title: 'Keep Practicing',
        message: `The correct translation for ${currentCard.hindiWord} is ${currentCard.tribalWord}`,
        type: 'warning'
      });
    }
  };

  if (!currentCard) return null;

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Interactive Vocabulary Flashcards
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Mother-Tongue Phonetics
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Tactile 3D flip cards with dual scripts and audio pronunciation for foundational classroom words.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isPracticeMode ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => {
              setIsPracticeMode(!isPracticeMode);
              setIsFlipped(false);
              setSelectedPracticeOption(null);
              setPracticeFeedback(null);
            }}
            icon={isPracticeMode ? <RotateCw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          >
            {isPracticeMode ? 'Card Mode' : 'Start Practice'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Flashcard
          </Button>
        </div>
      </div>

      {/* Progress & Deck Status Bar */}
      <div className="flex items-center justify-between gap-4 bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Card {currentIndex + 1} of {flashcards.length}
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
            {currentCard.category}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-36 sm:w-48 bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
          />
        </div>

        {isPracticeMode && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
            <Award className="w-4 h-4" />
            <span>Score: {practiceScore}</span>
          </div>
        )}
      </div>

      {/* Main Flashcard 3D Stage */}
      <div className="relative flex flex-col items-center justify-center">
        {/* The Card */}
        <div
          onClick={() => !isPracticeMode && setIsFlipped(!isFlipped)}
          className={`w-full max-w-lg h-96 perspective-1000 cursor-pointer select-none`}
        >
          <div
            className={`w-full h-full relative duration-500 transform-style-3d transition-transform ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT OF CARD (Hindi Source) */}
            <div className="absolute inset-0 w-full h-full bg-white rounded-3xl p-8 border-2 border-slate-200/90 shadow-xl flex flex-col justify-between items-center text-center backface-hidden">
              <div className="w-full flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider">Hindi Word</span>
                <span className="text-indigo-600 font-bold flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" />
                  Tap to flip
                </span>
              </div>

              {/* Center Visual & Hindi Word */}
              <div className="space-y-4 my-auto">
                <div className="w-20 h-20 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto shadow-xs">
                  <IconComponent className="w-10 h-10" />
                </div>

                <div>
                  <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Noto_Sans_Devanagari']">
                    {currentCard.hindiWord}
                  </h2>
                  <p className="text-sm font-semibold text-slate-500 mt-1">
                    {currentCard.englishMeaning}
                  </p>
                </div>

                <p className="text-xs text-slate-400 max-w-xs mx-auto italic">
                  "{currentCard.sampleSentenceHindi}"
                </p>
              </div>

              {/* Pronunciation trigger on front */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playSpeech(currentCard.hindiWord, 'hi-IN');
                }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear Hindi</span>
              </button>
            </div>

            {/* BACK OF CARD (Tribal Santhali / Mother Tongue) */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-50 via-white to-teal-50/40 rounded-3xl p-8 border-2 border-teal-300 shadow-xl flex flex-col justify-between items-center text-center rotate-y-180 backface-hidden">
              <div className="w-full flex items-center justify-between text-xs text-teal-700">
                <span className="font-bold uppercase tracking-wider">Santhali (Ol Chiki)</span>
                <span className="font-semibold flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" />
                  Flip to Hindi
                </span>
              </div>

              {/* Tribal Content */}
              <div className="space-y-4 my-auto">
                <div className="w-20 h-20 rounded-3xl bg-teal-100/80 border border-teal-200 flex items-center justify-center text-teal-700 mx-auto shadow-xs">
                  <IconComponent className="w-10 h-10" />
                </div>

                <div>
                  <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-wide">
                    {currentCard.tribalWord}
                  </h2>
                  <p className="text-base font-bold text-teal-800 mt-1 italic">
                    Pronunciation: "{currentCard.phonetic}"
                  </p>
                </div>

                <p className="text-xs text-teal-900/80 max-w-xs mx-auto italic">
                  "{currentCard.sampleSentenceTribal}"
                </p>
              </div>

              {/* Audio Pronunciation Button */}
              <button
                onClick={handlePronounce}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Tribal Pronunciation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Practice Mode Interactive Quiz Bar */}
        {isPracticeMode && (
          <div className="w-full max-w-lg mt-6 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-md text-center space-y-3 animate-in fade-in-50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Choose the Santhali word for "{currentCard.hindiWord}":
            </h4>

            <div className="grid grid-cols-3 gap-2">
              {practiceOptions.map((opt, i) => {
                const isSelected = selectedPracticeOption === opt;
                const isCorrect = opt === currentCard.tribalWord;

                let btnClass = 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';
                if (selectedPracticeOption) {
                  if (isCorrect) {
                    btnClass = 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
                  } else if (isSelected) {
                    btnClass = 'bg-rose-100 text-rose-800 border-rose-300 font-bold';
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={!!selectedPracticeOption}
                    onClick={() => handleAnswerPractice(opt)}
                    className={`p-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {practiceFeedback && (
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleNext}
                  icon={<ChevronRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Next Word
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center gap-4 mt-6">
          <Button
            variant="outline"
            size="md"
            onClick={handlePrev}
            icon={<ChevronLeft className="w-4 h-4" />}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => setIsFlipped(!isFlipped)}
            icon={<RotateCw className="w-4 h-4" />}
          >
            Flip Card
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            icon={<ChevronRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Next
          </Button>
        </div>

        {/* Management Buttons */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200/60 w-full max-w-md justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={openEditModal}
            icon={<Edit className="w-3.5 h-3.5" />}
          >
            Edit Card
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
            onClick={handleDelete}
            icon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Delete Card
          </Button>
        </div>
      </div>

      {/* Add Flashcard Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Vocabulary Flashcard"
          subtitle="Add bilingual word pairs to your classroom deck"
          maxWidth="md"
        >
          <form onSubmit={handleAddCard} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hindi Word (e.g. आम, पानी, घर)
              </label>
              <input
                type="text"
                required
                placeholder="Hindi term"
                value={formHindi}
                onChange={(e) => setFormHindi(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Noto_Sans_Devanagari']"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tribal Word (Ol Chiki or Script)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ᱩᱞ or ᱫᱟᱜ"
                value={formTribal}
                onChange={(e) => setFormTribal(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phonetic Transliteration
              </label>
              <input
                type="text"
                placeholder="e.g. Ul, Daah, Orak"
                value={formPhonetic}
                onChange={(e) => setFormPhonetic(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                English Meaning
              </label>
              <input
                type="text"
                placeholder="e.g. Mango"
                value={formEnglish}
                onChange={(e) => setFormEnglish(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
              >
                Save Card
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Flashcard Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Flashcard"
          subtitle="Modify tribal spelling or phonetic pronunciation"
          maxWidth="md"
        >
          <form onSubmit={handleEditCard} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hindi Word
              </label>
              <input
                type="text"
                required
                value={formHindi}
                onChange={(e) => setFormHindi(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Noto_Sans_Devanagari']"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tribal Word (Script)
              </label>
              <input
                type="text"
                required
                value={formTribal}
                onChange={(e) => setFormTribal(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phonetic Pronunciation
              </label>
              <input
                type="text"
                value={formPhonetic}
                onChange={(e) => setFormPhonetic(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                English Meaning
              </label>
              <input
                type="text"
                value={formEnglish}
                onChange={(e) => setFormEnglish(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
              >
                Update Card
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
