import { useCallback, useRef } from 'react';
import { speakElevenLabs, speakBrowser } from '../lib/elevenlabs';
import { getVoiceSettings } from '../lib/persistence';

export function useTTS() {
  const busy = useRef(false);

  const speak = useCallback(async (text: string) => {
    if (busy.current) return;
    busy.current = true;
    const s = getVoiceSettings();
    try {
      if (s.enabled && s.elevenLabsApiKey && s.voiceId) {
        await speakElevenLabs(text, s.elevenLabsApiKey, s.voiceId);
      } else if (s.enabled) {
        await speakBrowser(text, s.rate, s.pitch);
      }
    } catch {
      try { await speakBrowser(text, s.rate, s.pitch); } catch {}
    } finally {
      busy.current = false;
    }
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    busy.current = false;
  }, []);

  return { speak, stop };
}
