import { useCallback, useState } from 'react';
import { useTTS } from './useTTS';
import { useVoiceInput } from './useVoiceInput';

export type STLPhase = 'idle' | 'speaking' | 'listening';

export function useSpeakThenListen(onUserResponse: (text: string) => void) {
  const [phase, setPhase] = useState<STLPhase>('idle');
  const { speak, stop: stopSpeech } = useTTS();
  const { start: startListening, stop: stopListening, error } = useVoiceInput((text) => {
    setPhase('idle');
    onUserResponse(text);
  });

  const run = useCallback(async (text: string) => {
    setPhase('speaking');
    stopListening();
    await speak(text);
    setPhase('listening');
    startListening();
  }, [speak, startListening, stopListening]);

  const cancel = useCallback(() => {
    stopSpeech();
    stopListening();
    setPhase('idle');
  }, [stopSpeech, stopListening]);

  return { phase, error, run, cancel };
}
