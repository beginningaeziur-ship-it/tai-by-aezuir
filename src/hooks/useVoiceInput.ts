import { useState, useCallback, useRef } from 'react';

export function useVoiceInput(onResult: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<any>(null);

  const start = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setError('Voice input not supported in this browser.'); return; }
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'en-US';
    rec.onresult = (e: any) => {
      onResult(e.results[0][0].transcript);
      setListening(false);
    };
    rec.onerror = () => { setError('Could not hear you. Please try again.'); setListening(false); };
    rec.onend = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
    setError(null);
  }, [onResult]);

  const stop = useCallback(() => { recRef.current?.stop(); setListening(false); }, []);

  return { listening, error, start, stop };
}
