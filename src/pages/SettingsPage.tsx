import React, { useState } from 'react';
import {
  Settings,
  User,
  School,
  MapPin,
  Languages,
  Volume2,
  Mic,
  Sliders,
  Type,
  RotateCcw,
  Save,
  Check,
  ShieldAlert
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useToast } from '../components/common/Toast';
import { TEACHER_PROFILE, LANGUAGES } from '../data/mockData';
import { LanguageCode } from '../types';

export const SettingsPage: React.FC = () => {
  const { showToast } = useToast();

  // Profile state
  const [name, setName] = useState(TEACHER_PROFILE.name);
  const [email, setEmail] = useState(TEACHER_PROFILE.email);
  const [school, setSchool] = useState(TEACHER_PROFILE.school);
  const [district, setDistrict] = useState(TEACHER_PROFILE.district);
  const [stateName, setStateName] = useState(TEACHER_PROFILE.state);

  // App preferences
  const [defaultLanguage, setDefaultLanguage] = useState<LanguageCode>('santhali');
  const [audioSpeed, setAudioSpeed] = useState<'0.75x' | '1x' | '1.25x'>('1x');
  const [micSensitivity, setMicSensitivity] = useState<'High' | 'Normal' | 'Low'>('Normal');
  const [showPhonetics, setShowPhonetics] = useState(true);
  const [showTribalScript, setShowTribalScript] = useState(true);
  const [fontSize, setFontSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      title: 'Settings Saved',
      message: 'Classroom preferences and profile have been updated.',
      type: 'success'
    });
  };

  const handleResetData = () => {
    setName(TEACHER_PROFILE.name);
    setSchool(TEACHER_PROFILE.school);
    setDistrict(TEACHER_PROFILE.district);
    setDefaultLanguage('santhali');
    setAudioSpeed('1x');
    setMicSensitivity('Normal');
    setShowPhonetics(true);
    setShowTribalScript(true);
    setFontSize('Medium');

    showToast({
      title: 'Preferences Restored',
      message: 'All settings reset to default Smart India Hackathon demonstrator state.',
      type: 'info'
    });
  };

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Platform Settings & Teacher Preferences
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Configure classroom audio speed, microphone sensitivity, teacher profile, and pedagogical script displays.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Section 1: Teacher & School Profile */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Teacher & School Profile
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teacher Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">School / Institution</label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
              <input
                type="text"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Language & Audio Preferences */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Languages className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Linguistic & Audio Settings
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Default Tribal Language
              </label>
              <select
                value={defaultLanguage}
                onChange={(e) => setDefaultLanguage(e.target.value as LanguageCode)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="santhali">Santhali (Ol Chiki)</option>
                <option value="ho">Ho (Warang Citi)</option>
                <option value="mundari">Mundari (Nagari)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Audio Playback Speed
              </label>
              <div className="flex items-center gap-1">
                {(['0.75x', '1x', '1.25x'] as const).map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setAudioSpeed(spd)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                      audioSpeed === spd
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {spd}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Microphone Sensitivity
              </label>
              <select
                value={micSensitivity}
                onChange={(e) => setMicSensitivity(e.target.value as 'High' | 'Normal' | 'Low')}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="High">High (Quiet Classrooms)</option>
                <option value="Normal">Normal (Standard)</option>
                <option value="Low">Low (Noisy Backgrounds)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Display Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Type className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Display & Script Options
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <p className="text-xs font-bold text-slate-800">Show Phonetic Roman Pronunciation</p>
                <p className="text-[11px] text-slate-500">Aids teachers who cannot yet read Ol Chiki or Warang Citi script</p>
              </div>
              <input
                type="checkbox"
                checked={showPhonetics}
                onChange={(e) => setShowPhonetics(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <p className="text-xs font-bold text-slate-800">Show Indigenous Native Script</p>
                <p className="text-[11px] text-slate-500">Renders Ol Chiki and Nagari fonts in large display headers</p>
              </div>
              <input
                type="checkbox"
                checked={showTribalScript}
                onChange={(e) => setShowTribalScript(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <p className="text-xs font-bold text-slate-800">Display Font Size</p>
                <p className="text-[11px] text-slate-500">Scale typography for projector or classroom screen display</p>
              </div>
              <div className="flex items-center gap-1">
                {(['Small', 'Medium', 'Large'] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setFontSize(sz)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                      fontSize === sz
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: System Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <Button
            variant="outline"
            size="md"
            type="button"
            onClick={handleResetData}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Reset to Defaults
          </Button>

          <Button
            variant="primary"
            size="md"
            type="submit"
            icon={<Save className="w-4 h-4" />}
          >
            Save All Preferences
          </Button>
        </div>

      </form>
    </div>
  );
};
