import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { playSpeech, stopSpeech, playChime } from '../../utils/audio';

interface AudioPlayerProps {
  textToSpeak?: string;
  lang?: string;
  durationLabel?: string;
  title?: string;
  autoPlay?: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  textToSpeak = '',
  lang = 'hi-IN',
  durationLabel = '00:03',
  title = 'Native Pronunciation Audio',
  autoPlay = false,
  onPlayStateChange,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState<0.8 | 1.0 | 1.2>(1.0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (autoPlay && textToSpeak) {
      handleTogglePlay();
    }
    return () => {
      stopSpeech();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleTogglePlay = async () => {
    if (isPlaying) {
      stopSpeech();
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
      setProgress(0);
      onPlayStateChange?.(false);
    } else {
      setIsPlaying(true);
      onPlayStateChange?.(true);
      setProgress(0);

      // Play chime or speech
      if (!isMuted) {
        if (textToSpeak) {
          playSpeech(textToSpeak, lang, speed);
        } else {
          playChime(392, 0.6);
        }
      }

      // Simulate playback progress bar
      const startTime = Date.now();
      const totalDurationMs = 2500 / speed;

      intervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, Math.round((elapsed / totalDurationMs) * 100));
        setProgress(pct);

        if (pct >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsPlaying(false);
          onPlayStateChange?.(false);
        }
      }, 50);
    }
  };

  const handleRestart = () => {
    stopSpeech();
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
    setProgress(0);
    setTimeout(() => handleTogglePlay(), 100);
  };

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-900 text-white rounded-2xl shadow-inner ${className}`}>
      <div className="flex items-center gap-3">
        <button
          onClick={handleTogglePlay}
          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer"
          title={isPlaying ? 'Pause Audio' : 'Play Audio'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
        </button>

        <button
          onClick={handleRestart}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Restart Audio"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-200 truncate">{title}</p>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>{isPlaying ? 'Playing...' : 'Ready'}</span>
            <span>•</span>
            <span>{durationLabel}</span>
          </div>
        </div>
      </div>

      {/* Waveform / Progress Slider */}
      <div className="flex-1 max-w-xs flex items-center gap-2 px-2">
        {/* Animated wave bars when playing */}
        <div className="flex items-center gap-0.5 h-5 w-16">
          {[40, 70, 90, 60, 100, 50, 80, 45].map((height, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-all duration-150 ${
                isPlaying ? 'bg-blue-400' : 'bg-slate-700'
              }`}
              style={{
                height: isPlaying ? `${Math.max(20, (height * (progress % 30 + 10)) / 30)}%` : '20%',
              }}
            />
          ))}
        </div>

        <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden relative cursor-pointer" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickPos = (e.clientX - rect.left) / rect.width;
          setProgress(Math.round(clickPos * 100));
        }}>
          <div 
            className="bg-blue-500 h-full rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Speed & Volume */}
      <div className="flex items-center gap-2 self-end sm:self-center">
        <button
          onClick={() => {
            const speeds: (0.8 | 1.0 | 1.2)[] = [0.8, 1.0, 1.2];
            const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
            setSpeed(next);
          }}
          className="px-2 py-1 text-[10px] font-bold rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Playback speed"
        >
          {speed}x
        </button>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
