import React, { useState } from 'react';
import {
  ArrowLeftRight,
  Copy,
  Volume2,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Check,
  Languages,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { AudioPlayer } from '../components/common/AudioPlayer';
import { useToast } from '../components/common/Toast';
import { LANGUAGES, TRANSLATION_PRESETS } from '../data/mockData';
import { LanguageCode } from '../types';

export const TextTranslatorPage: React.FC = () => {
  const { showToast } = useToast();

  const [sourceLang, setSourceLang] = useState<LanguageCode>('hindi');
  const [targetLang, setTargetLang] = useState<LanguageCode>('santhali');
  const [sourceText, setSourceText] = useState('यह एक किताब है।');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [outputResult, setOutputResult] = useState<{
    script: string;
    phonetic: string;
    notes: string;
  }>({
    script: 'ᱱᱚᱣᱟ ᱫᱚ ᱢᱤᱫᱴᱟᱹᱝ ᱯᱩᱛᱷᱤ ᱠᱟᱱᱟ᱾',
    phonetic: 'Nowa do midtang puthi kana.',
    notes: 'Demo translation — requires native-speaker validation.'
  });

  const handleSwap = () => {
    const prevSource = sourceLang;
    const prevTarget = targetLang;
    setSourceLang(prevTarget);
    setTargetLang(prevSource);

    // Swap text if available
    if (outputResult) {
      setSourceText(outputResult.phonetic);
      setOutputResult({
        script: sourceText,
        phonetic: sourceText,
        notes: 'Demo translation — requires native-speaker validation.'
      });
    }
    showToast({
      title: 'Languages Swapped',
      message: `Now translating from ${prevTarget.toUpperCase()} to ${prevSource.toUpperCase()}`,
      type: 'info'
    });
  };

  const handleTranslate = () => {
    if (!sourceText.trim()) {
      showToast({
        title: 'Input Required',
        message: 'Please enter text in the source area to translate.',
        type: 'warning'
      });
      return;
    }

    setIsTranslating(true);
    setTimeout(() => {
      // Check preset or generate
      const preset = TRANSLATION_PRESETS[sourceText]?.[targetLang];
      if (preset) {
        setOutputResult(preset);
      } else {
        const targetObj = LANGUAGES.find(l => l.id === targetLang);
        setOutputResult({
          script: `[${targetObj?.name} Translated Text for: "${sourceText}"]`,
          phonetic: `Phonetic phonetic transcription in ${targetObj?.name}`,
          notes: 'Demo translation — requires native-speaker validation.'
        });
      }
      setIsTranslating(false);
      showToast({
        title: 'Translation Complete',
        message: 'Generated bilingual text with phonetic transliteration.',
        type: 'success'
      });
    }, 600);
  };

  const handleCopy = () => {
    if (!outputResult) return;
    navigator.clipboard.writeText(`${outputResult.script}\n${outputResult.phonetic}`);
    setCopied(true);
    showToast({
      title: 'Copied',
      message: 'Translated text copied to clipboard.',
      type: 'info'
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 text-left max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Text Translator
          </h1>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
            Bidirectional
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Translate educational passages, questions, and classroom signs between Hindi and regional tribal languages.
        </p>
      </div>

      {/* Language Header Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-4 flex-wrap">
        {/* Source language select */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">From:</span>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value as LanguageCode)}
            className="flex-1 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} ({l.nativeName})
              </option>
            ))}
          </select>
        </div>

        {/* Swap button */}
        <button
          onClick={handleSwap}
          className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-colors shadow-2xs"
          title="Swap Source and Target Languages"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>

        {/* Target language select */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">To:</span>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value as LanguageCode)}
            className="flex-1 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {LANGUAGES.filter((l) => l.id !== sourceLang).map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} ({l.nativeName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mandatory Notice */}
      <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-center gap-3 text-xs text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Important:</strong> Translation quality requires native-speaker validation before being printed into official textbooks.
        </span>
      </div>

      {/* Two Panes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Source Text Box */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Source ({LANGUAGES.find(l => l.id === sourceLang)?.name})
              </span>
              <button
                onClick={() => setSourceText('')}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            </div>

            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Enter text to translate..."
              rows={6}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-['Noto_Sans_Devanagari'] leading-relaxed resize-none"
            />

            {/* Quick Sample Input Chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-400">Quick Samples:</span>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSourceText('यह एक किताब है।')}
                  className="text-xs bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                >
                  यह एक किताब है।
                </button>
                <button
                  onClick={() => setSourceText('आज हम 1 से 10 तक गिनती सीखेंगे।')}
                  className="text-xs bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                >
                  1 से 10 गिनती
                </button>
                <button
                  onClick={() => setSourceText('कृपया अपनी कॉपी खोलो।')}
                  className="text-xs bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                >
                  कॉपी खोलो
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSourceText('')}
            >
              Clear
            </Button>
            <Button
              variant="primary"
              size="sm"
              isLoading={isTranslating}
              onClick={handleTranslate}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Translate
            </Button>
          </div>
        </div>

        {/* Target Translation Box */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                Target ({LANGUAGES.find(l => l.id === targetLang)?.name})
              </span>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                Ol Chiki / Tribal Script
              </span>
            </div>

            <div className="min-h-[160px] p-4 rounded-xl bg-teal-50/40 border border-teal-200/80 flex flex-col justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900 leading-relaxed">
                  {outputResult.script}
                </p>
                <div className="mt-3 pt-2 border-t border-teal-100/70">
                  <span className="text-[11px] font-semibold text-slate-500">Phonetic Roman:</span>
                  <p className="text-sm font-medium text-teal-900 mt-0.5 italic">
                    "{outputResult.phonetic}"
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-amber-700 font-medium mt-3">
                {outputResult.notes}
              </p>
            </div>

            {/* Audio Playback */}
            <AudioPlayer
              textToSpeak={outputResult.phonetic}
              title={`${LANGUAGES.find(l => l.id === targetLang)?.name} Pronunciation`}
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              icon={copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            >
              {copied ? 'Copied' : 'Copy Text'}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
