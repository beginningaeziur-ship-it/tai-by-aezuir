import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useMicrophone } from '../../contexts/MicrophoneContext';

interface Props {
  onPress?: () => void;
  listening?: boolean;
}

export function GlobalMicButton({ onPress, listening = false }: Props) {
  const { micEnabled, micConsented } = useMicrophone();

  if (!micConsented) return null;

  return (
    <button
      onClick={onPress}
      className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400 ${
        listening
          ? 'bg-red-500 scale-110 shadow-red-500/40'
          : micEnabled
          ? 'bg-blue-600 hover:bg-blue-500'
          : 'bg-slate-700 hover:bg-slate-600'
      }`}
      aria-label={listening ? 'Listening — tap to stop' : 'Tap to speak to SAI'}
      aria-pressed={listening}
    >
      {listening ? (
        <MicOff className="w-7 h-7 text-white" aria-hidden />
      ) : (
        <Mic className="w-7 h-7 text-white" aria-hidden />
      )}
      {listening && (
        <span className="absolute inset-0 rounded-full bg-red-400 opacity-30 animate-ping" aria-hidden />
      )}
    </button>
  );
}
