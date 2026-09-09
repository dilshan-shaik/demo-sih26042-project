/**
 * Client-side audio utility for MultimodalText prototype
 * Uses Web Speech API where supported and Web Audio API for phonetic tones/downloadable WAV blobs.
 */

export const playSpeech = (text: string, lang = 'hi-IN', rate = 0.9): Promise<void> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      playChime(440, 0.4);
      setTimeout(resolve, 800);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1.0;

    utterance.onend = () => resolve();
    utterance.onerror = () => {
      // Fallback to pleasant educational chime
      playChime(523.25, 0.5);
      resolve();
    };

    window.speechSynthesis.speak(utterance);
  });
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Generates an acoustic melodic chime using Web Audio API
 */
export const playChime = (freq = 440, duration = 0.4) => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn('AudioContext not permitted or supported yet', e);
  }
};

/**
 * Creates a downloadable .wav audio file for the translated lesson audio
 */
export const downloadMockWav = (text: string, filename = 'translation-audio.wav') => {
  const sampleRate = 22050;
  const duration = 2.5; // seconds
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  // RIFF header
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // PCM format
  view.setUint16(20, 1, true); // Linear quantization
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  // Generate synthetic voice wave
  const baseFreq = 220; // A3 tone with slight frequency modulation
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const envelope = Math.sin((Math.PI * t) / duration);
    const mod = 1 + 0.1 * Math.sin(2 * Math.PI * 5 * t);
    const sample = Math.sin(2 * Math.PI * baseFreq * mod * t) * envelope;
    view.setInt16(44 + i * 2, Math.floor(sample * 16383), true);
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
