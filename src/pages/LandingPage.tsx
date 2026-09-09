import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  Languages,
  FileText,
  Sparkles,
  CheckCircle2,
  Users,
  Volume2,
  ArrowRight,
  BookOpen,
  HeartHandshake,
  GraduationCap,
  ShieldCheck,
  Play,
  Pause,
  Layers,
  Sparkle
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { playSpeech, stopSpeech } from '../utils/audio';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleToggleVoiceDemo = async () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      await playSpeech('आज हम 1 से 10 तक गिनती सीखेंगे', 'hi-IN', 0.9);
      setIsPlayingAudio(false);
    }
  };

  const featureCards = [
    {
      icon: Mic,
      title: 'Voice-to-Voice Translation',
      description: 'Teachers speak natural Hindi instructions and students hear synchronized mother-tongue translations.',
      color: 'blue'
    },
    {
      icon: Languages,
      title: 'Hindi to Tribal-Language Learning',
      description: 'Accurate vocabulary mapping across Santhali (Ol Chiki), Ho (Warang Citi), and Mundari language scripts.',
      color: 'teal'
    },
    {
      icon: FileText,
      title: 'Bilingual Worksheets',
      description: 'Ready-to-print classroom activities featuring image matching, dual-script vocabulary, and fill-in-the-blanks.',
      color: 'indigo'
    },
    {
      icon: Sparkles,
      title: 'Interactive Flashcards',
      description: 'Tactile flip cards with native audio phonetics to build foundational vocabulary in early grades.',
      color: 'amber'
    },
    {
      icon: ShieldCheck,
      title: 'Teacher Validation',
      description: 'Human-in-the-loop review workflow ensuring all AI suggestions are culturally accurate and vetted by educators.',
      color: 'emerald'
    },
    {
      icon: Users,
      title: 'Student-Friendly Learning',
      description: 'Designed for primary students in remote schools to overcome language barriers and build school confidence.',
      color: 'rose'
    }
  ];

  const impactPoints = [
    {
      title: 'Better understanding of lessons',
      detail: 'Children grasp foundational concepts when introduced through words they use daily with family and peers.'
    },
    {
      title: 'Improved foundational literacy',
      detail: 'Bilingual learning reinforces reading readiness in both mother-tongue scripts and school Hindi medium.'
    },
    {
      title: 'Higher classroom participation',
      detail: 'Eliminates apprehension and language anxiety, inspiring first-generation tribal learners to speak up.'
    },
    {
      title: 'Greater confidence in learning',
      detail: 'Validates indigenous cultural identity, making classrooms inclusive and welcoming.'
    },
    {
      title: 'Better connection between home language and school language',
      detail: 'Creates a supportive cognitive bridge between the home vernacular and standardized state curriculum.'
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col text-slate-900">
      {/* Top Banner Navigation */}
      <header className="border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700 bg-clip-text text-transparent">
                MultimodalText
              </span>
              <p className="text-[11px] font-semibold text-slate-500 tracking-wide uppercase">
                AI-Powered Tribal-Language Learning Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/voice-translator')}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors hidden sm:block"
            >
              Live Demo
            </button>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/dashboard')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Explore Platform
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left: Headings & CTA */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200/80 text-blue-800 text-xs font-bold tracking-wide">
                <Sparkle className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                <span>Smart India Hackathon Prototype</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Learning Begins in the Language of Every Child
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
                Empowering tribal-language students through AI-powered translation, voice learning, bilingual lessons, worksheets, and interactive flashcards.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/dashboard')}
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Explore Platform
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/voice-translator')}
                  icon={<Volume2 className="w-5 h-5 text-blue-600" />}
                >
                  View Demo
                </Button>
              </div>

              {/* Verified Notice Note */}
              <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="font-semibold">Ethical AI Principle:</strong> Translations are clearly marked as demo output until verified by native-speaking educators via our validation queue.
                </p>
              </div>
            </div>

            {/* Hero Right: Interactive Educational Illustration */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Visual card container */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-100 to-transparent rounded-bl-full pointer-events-none" />

                  {/* Flow Header */}
                  <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Bilingual Classroom Bridge
                      </span>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Live Simulation
                    </span>
                  </div>

                  {/* Visual Scene: Teacher Speaking */}
                  <div className="py-6 space-y-4">
                    {/* Teacher speech bubble */}
                    <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-sm">
                        शिक्षिका
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">Teacher (Hindi Input)</span>
                          <span className="text-[10px] text-slate-400">Classroom Voice</span>
                        </div>
                        <p className="text-sm font-medium text-slate-900 mt-1 font-['Noto_Sans_Devanagari']">
                          "आज हम 1 से 10 तक गिनती सीखेंगे।"
                        </p>
                        
                        {/* Audio Waveform button */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={handleToggleVoiceDemo}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs"
                          >
                            {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                            <span>{isPlayingAudio ? 'Speaking...' : 'Play Voice'}</span>
                          </button>
                          
                          {/* Animated Waveform Bars */}
                          <div className="flex items-center gap-1 h-5">
                            {[30, 80, 50, 95, 60, 85, 40, 70].map((h, i) => (
                              <span
                                key={i}
                                className={`w-1 rounded-full ${isPlayingAudio ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`}
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Translation Transformation Bridge */}
                    <div className="flex items-center justify-center gap-2 py-1 text-xs font-semibold text-slate-500">
                      <div className="h-px bg-slate-200 flex-1" />
                      <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 flex items-center gap-1.5 text-blue-700">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>AI Speech & Phonetic Bridge</span>
                      </div>
                      <div className="h-px bg-slate-200 flex-1" />
                    </div>

                    {/* Student Learning Output (Santhali) */}
                    <div className="flex items-start gap-3 bg-teal-50/70 p-4 rounded-2xl border border-teal-200/80">
                      <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-sm">
                        ᱯᱟᱹᱴᱷᱩᱣᱟᱹ
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-teal-900">Student (Santhali Mother Tongue)</span>
                          <span className="text-[10px] font-semibold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                            Ol Chiki Script
                          </span>
                        </div>
                        <p className="text-base font-bold text-slate-900 mt-1">
                          ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱑ ᱠᱷᱚᱱ ᱑᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾
                        </p>
                        <p className="text-xs text-teal-800 italic mt-0.5">
                          Teheñ abo 1 khon 10 dhabij lekha bon chedog-a.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Educational Cards preview footer */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="block text-xs font-bold text-slate-800">1 (ᱢᱤᱫ - Mid)</span>
                      <span className="text-[10px] text-slate-500">Number One</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="block text-xs font-bold text-slate-800">2 (ᱵᱟᱨ - Bar)</span>
                      <span className="text-[10px] text-slate-500">Number Two</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="block text-xs font-bold text-slate-800">3 (ᱯᱮ - Pe)</span>
                      <span className="text-[10px] text-slate-500">Number Three</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 sm:py-24 bg-slate-50/70 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
              Core Capabilities
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Equipping Teachers with Real-Time Mother-Tongue Tools
            </h3>
            <p className="mt-3 text-base text-slate-600">
              A comprehensive toolkit created specifically for regional classrooms where Hindi-speaking teachers instruct students whose mother tongue is Santhali, Ho, or Mundari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5 text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Educational Impact
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Transforming the Classroom Experience
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                When children are taught in a language they already know and love, classrooms shift from silence and confusion to active joy, questioning, and discovery.
              </p>

              <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-sm">
                <p className="font-semibold mb-1">Human-Centered Pedagogy:</p>
                <p className="text-xs text-teal-800 leading-relaxed">
                  National Education Policy (NEP 2020) emphasizes primary education in the mother tongue. MultimodalText directly operationalizes this mandate for remote tribal schools across India.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {impactPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-slate-900">{point.title}</h5>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {point.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base font-bold text-white">MultimodalText</p>
              <p className="text-xs text-slate-400">Smart India Hackathon Web Prototype • Built for Tribal Education</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="md"
              className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:text-white"
              onClick={() => navigate('/voice-translator')}
            >
              Voice Demonstration
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/dashboard')}
            >
              Open Teacher Dashboard
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};
