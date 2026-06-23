import React, { useEffect, useRef } from 'react';
import { FullBodySAI } from '../sai/FullBodySAI';
import { useSAI } from '../../contexts/SAIContext';

interface Props {
  message: string;
  optionA: string;
  optionB: string;
  onA: () => void;
  onB: () => void;
  autoSpeak?: boolean;
  children?: React.ReactNode;
}

export function ConversationalScreen({ message, optionA, optionB, onA, onB, autoSpeak = true, children }: Props) {
  const { saySAI, speaking } = useSAI();
  const spoken = useRef(false);

  useEffect(() => {
    if (autoSpeak && !spoken.current) {
      spoken.current = true;
      saySAI(message);
    }
  }, [message, autoSpeak, saySAI]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 flex flex-col items-center justify-end pb-8 px-4">
      <div className="flex-1 flex flex-col items-center justify-center gap-4 w-full max-w-sm pt-12">
        <FullBodySAI size="lg" speaking={speaking} />
        {children}
      </div>

      <div className="w-full max-w-sm space-y-4">
        <div
          className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-white text-base leading-relaxed text-center">{message}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onA}
            disabled={speaking}
            className="py-4 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-sm text-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {optionA}
          </button>
          <button
            onClick={onB}
            disabled={speaking}
            className="py-4 px-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white font-medium text-sm text-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {optionB}
          </button>
        </div>
      </div>
    </main>
  );
}
