import React, { createContext, useContext, useState } from 'react';
import { VoiceSettings, getVoiceSettings, saveVoiceSettings } from '../lib/persistence';

interface Ctx {
  voiceSettings: VoiceSettings;
  updateVoice: (partial: Partial<VoiceSettings>) => void;
}

const VoiceSettingsContext = createContext<Ctx | null>(null);

export function VoiceSettingsProvider({ children }: { children: React.ReactNode }) {
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(getVoiceSettings);

  const updateVoice = (partial: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => {
      const next = { ...prev, ...partial };
      saveVoiceSettings(next);
      return next;
    });
  };

  return (
    <VoiceSettingsContext.Provider value={{ voiceSettings, updateVoice }}>
      {children}
    </VoiceSettingsContext.Provider>
  );
}

export function useVoiceSettings() {
  const ctx = useContext(VoiceSettingsContext);
  if (!ctx) throw new Error('useVoiceSettings must be used within VoiceSettingsProvider');
  return ctx;
}
