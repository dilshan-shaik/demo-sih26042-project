import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Copy,
  Download,
  BookmarkPlus,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Check,
  Languages,
  Play,
  Pause,
  Clock,
  Radio,
  Share2
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { AudioPlayer } from '../components/common/AudioPlayer';
import { useToast } from '../components/common/Toast';
import { LANGUAGES, TRANSLATION_PRESETS } from '../data/mockData';
import { playSpeech, stopSpeech, downloadMockWav } from '../utils/audio';

export const VoiceTranslatorPage: React.FC = () => {
  const { showToast } = useToast();

  const [sourceLanguage] = useState('Hindi');
  const [targetLanguage, setTargetLanguage] = useState<'santhali' | 'ho' | 'mundari'>('santhali');
  const [inputText, setInputText] = useState('आज हम 1 से 10 तक गिनती सीखेंगे।');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'listening' | 'captured'>('idle');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState<{
    script: string;
    phonetic: string;
    notes: string;
  } | null>({
    script: 'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱑ ᱠᱷᱚᱱ ᱑᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾',
    phonetic: 'Teheñ abo 1 khon 10 dhabij lekha bon chedog-a.',
    notes: 'Demo translation — requires native-speaker validation.'
  });
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Recording timer handler
  useEffect(() => {
    if (isRecording) {
      setRecordingStatus('listening');
      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    setRecordingStatus('listening');
    showToast({
      title: 'Microphone Active',
      message: 'Listening for teacher classroom instruction in Hindi...',
      type: 'info'
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingStatus('captured');
    showToast({
      title: 'Speech Captured',
      message: 'Teacher voice captured: "आज हम 1 से 10 तक गिनती सीखेंगे।"',
      type: 'success'
    });
  };

  const handleTranslate = () => {
    if (!inputText.trim()) {
      showToast({
        title: 'Empty Input',
        message: 'Please provide teacher Hindi speech or text first.',
        type: 'warning'
      });
      return;
    }

    setIsTranslating(true);
    // Simulate translation pipeline with multi-step latency
    setTimeout(() => {
      // Find preset or build mock result
      const preset = TRANSLATION_PRESETS[inputText]?.[targetLanguage];
      if (preset) {
        setTranslationResult(preset);
      } else {
        // Fallback for custom text
        const targetObj = LANGUAGES.find(l => l.id === targetLanguage);
        setTranslationResult({
          script: `[${targetObj?.name} Translation for: ${inputText}]`,
          phonetic: `Phonetic representation in ${targetObj?.name} dialect`,
          notes: 'Demo translation — requires native-speaker validation.'
        });
      }
      setIsTranslating(false);
      showToast({
        title: 'Translation Generated',
        message: `Successfully generated ${targetLanguage.toUpperCase()} audio and text.`,
        type: 'success'
      });
    }, 900);
  };

  const handleCopy = () => {
    if (!translationResult) return;
    const textToCopy = `${translationResult.script}\n${translationResult.phonetic}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast({
      title: 'Copied to Clipboard',
      message: 'Tribal script and phonetic text copied successfully.',
      type: 'info'
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAudio = () => {
    if (!translationResult) return;
    downloadMockWav(translationResult.phonetic, `sih-${targetLanguage}-lesson.wav`);
    showToast({
      title: 'Audio File Exported',
      message: `Downloaded .wav audio for classroom playback (${targetLanguage}).`,
      type: 'success'
    });
  };

  const handleSaveLesson = () => {
    setIsSaved(true);
    showToast({
      title: 'Saved to Lesson Library',
      message: 'This bilingual instruction has been saved to your primary teaching units.',
      type: 'success'
    });
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Voice Translator Studio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              Main SIH Demo
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time speech-to-speech bridge translating teacher classroom instructions into mother-tongue tribal dialects.
          </p>
        </div>

        {/* Target language selector */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs self-start md:self-auto">
          <Languages className="w-4 h-4 text-blue-600 ml-2" />
          <span className="text-xs font-semibold text-slate-500">Target Language:</span>
          <select
            value={targetLanguage}
            onChange={(e) => {
              const val = e.target.value as 'santhali' | 'ho' | 'mundari';
              setTargetLanguage(val);
              // Trigger instant re-translate if preset
              const preset = TRANSLATION_PRESETS[inputText]?.[val];
              if (preset) setTranslationResult(preset);
            }}
            className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="santhali">Santhali (Ol Chiki)</option>
            <option value="ho">Ho (Warang Citi)</option>
            <option value="mundari">Mundari (Nagari)</option>
          </select>
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PANEL 1: Teacher Input Panel */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Panel Top Meta */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Teacher Input Panel
                </span>
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                Source: {sourceLanguage}
              </span>
            </div>

            {/* Microphone Recording Zone */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center relative overflow-hidden">
              {/* Pulsing indicator when recording */}
              {isRecording && (
                <div className="absolute inset-0 bg-blue-500/5 animate-pulse pointer-events-none" />
              )}

              <div className="relative mb-3">
                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer ${
                    isRecording
                      ? 'bg-rose-600 hover:bg-rose-700 text-white animate-bounce'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
                  }`}
                  title={isRecording ? 'Stop Recording' : 'Start Recording'}
                >
                  {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                </button>
              </div>

              {/* Recording Status & Duration */}
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-slate-400'}`} />
                  <span className="text-xs font-bold text-slate-700">
                    {isRecording ? 'Listening to Teacher Voice...' : recordingStatus === 'captured' ? 'Voice Captured' : 'Ready to Record'}
                  </span>
                </div>
                <div className="text-sm font-mono font-semibold text-slate-500 flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Duration: {formatSeconds(recordingSeconds)}</span>
                </div>
              </div>

              {/* Audio Waveform Animation Bar */}
              <div className="flex items-center gap-1 h-8 mt-4">
                {[35, 60, 85, 45, 95, 75, 50, 90, 65, 40, 80, 55, 100, 70, 45].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-150 ${
                      isRecording ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                    style={{
                      height: isRecording ? `${Math.max(20, (h * ((recordingSeconds % 5) + 1)) / 5)}%` : '20%',
                    }}
                  />
                ))}
              </div>

              {/* Start / Stop Buttons */}
              <div className="flex items-center gap-3 mt-4">
                {!isRecording ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleStartRecording}
                    icon={<Mic className="w-4 h-4" />}
                  >
                    Start Recording
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleStopRecording}
                    icon={<MicOff className="w-4 h-4" />}
                  >
                    Stop Recording
                  </Button>
                )}
                {recordingSeconds > 0 && !isRecording && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setRecordingSeconds(0);
                      setRecordingStatus('idle');
                    }}
                    icon={<RotateCcw className="w-3.5 h-3.5" />}
                  >
                    Reset Audio
                  </Button>
                )}
              </div>
            </div>

            {/* Hindi Text Input Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Classroom Lesson Speech / Text (Hindi)
                </label>
                <button
                  onClick={() => setInputText('')}
                  className="text-[11px] font-semibold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or speak Hindi lesson instructions here..."
                rows={3}
                className="w-full p-3.5 text-base rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-['Noto_Sans_Devanagari'] leading-relaxed"
              />

              {/* Sample Preset Chips */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="text-[11px] text-slate-400 font-medium">Sample Sentences:</span>
                <button
                  onClick={() => setInputText('आज हम 1 से 10 तक गिनती सीखेंगे।')}
                  className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                >
                  1 से 10 गिनती
                </button>
                <button
                  onClick={() => setInputText('यह एक किताब है।')}
                  className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                >
                  यह एक किताब है
                </button>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setInputText('');
                setTranslationResult(null);
                setRecordingSeconds(0);
                setRecordingStatus('idle');
              }}
            >
              Clear All
            </Button>
            <Button
              variant="primary"
              size="md"
              isLoading={isTranslating}
              onClick={handleTranslate}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Translate to {LANGUAGES.find(l => l.id === targetLanguage)?.name}
            </Button>
          </div>
        </div>

        {/* PANEL 2: Learning Output Panel */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Panel Top Meta */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-teal-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Learning Output Panel
                </span>
              </div>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full capitalize">
                Target: {targetLanguage} (Mother Tongue)
              </span>
            </div>

            {/* Prominent Ethical AI Validation Warning (REQUIRED) */}
            <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900">
                  Demo translation — requires native-speaker validation.
                </p>
                <p className="text-[11px] text-amber-800 mt-0.5 leading-snug">
                  Tribal language syntax and cultural terms must be verified by certified teachers before classroom examination.
                </p>
              </div>
            </div>

            {/* Translation Output Card */}
            <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200/80 min-h-[160px] flex flex-col justify-between relative">
              {translationResult ? (
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-teal-800 uppercase tracking-wide">
                        Native Script Representation
                      </span>
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-full">
                        {targetLanguage === 'santhali' ? 'Ol Chiki' : targetLanguage === 'ho' ? 'Warang Citi' : 'Nagari'}
                      </span>
                    </div>
                    <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1.5 leading-relaxed tracking-wide">
                      {translationResult.script}
                    </p>
                  </div>

                  {/* Roman Transliteration & Phonetics */}
                  <div className="pt-2 border-t border-teal-100">
                    <span className="text-[11px] font-semibold text-slate-500">Phonetic Pronunciation:</span>
                    <p className="text-sm font-medium text-teal-900 mt-0.5 italic">
                      "{translationResult.phonetic}"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center my-auto text-center text-slate-400">
                  <Sparkles className="w-8 h-8 mb-2 stroke-1" />
                  <p className="text-xs">Click "Translate" to generate mother-tongue output.</p>
                </div>
              )}
            </div>

            {/* Audio Player Controls */}
            {translationResult && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Mother-Tongue Audio Output</span>
                  </label>
                  <span className="text-[10px] text-slate-500">HTML5 Audio & Speech</span>
                </div>
                <AudioPlayer
                  textToSpeak={translationResult.phonetic}
                  title={`${LANGUAGES.find(l => l.id === targetLanguage)?.name} Classroom Audio`}
                  durationLabel="00:03"
                />
              </div>
            )}
          </div>

          {/* Actions Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={!translationResult}
                icon={copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadAudio}
                disabled={!translationResult}
                icon={<Download className="w-4 h-4 text-blue-600" />}
              >
                Download Audio (.wav)
              </Button>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleSaveLesson}
              disabled={!translationResult || isSaved}
              icon={<BookmarkPlus className="w-4 h-4" />}
            >
              {isSaved ? 'Saved to Lessons' : 'Save Lesson'}
            </Button>
          </div>
        </div>

      </div>

      {/* Translation Flow Visual Pipeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Multimodal AI Translation Pipeline</h3>
            <p className="text-xs text-slate-500">How speech transforms into tribal classroom knowledge</p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
            Autonomous Flow
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
          {[
            { step: '1', title: 'Teacher Voice', desc: 'Classroom instruction spoken in spoken Hindi', badge: 'Audio Input' },
            { step: '2', title: 'Speech-to-Text', desc: 'Acoustic feature extraction & Hindi phoneme mapping', badge: 'ASR Model' },
            { step: '3', title: 'Hindi Processing', desc: 'Grammar analysis & contextual pedagogical intent', badge: 'NLP Normalizer' },
            { step: '4', title: 'Hindi-to-Tribal Translation', desc: 'Neural translation to Santhali, Ho, or Mundari', badge: 'Dialect LLM' },
            { step: '5', title: 'Tribal Text + Audio', desc: 'Synchronized native script & speech audio playback', badge: 'Ol Chiki TTS' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-blue-50/40 transition-colors text-left relative"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">{item.desc}</p>
              </div>

              {idx < 4 && (
                <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-400 text-[10px]">
                    →
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
