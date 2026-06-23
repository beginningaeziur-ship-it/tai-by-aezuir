import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilitySettings, getAccessibility, saveAccessibility } from '../lib/persistence';

interface Ctx {
  settings: AccessibilitySettings;
  update: (partial: Partial<AccessibilitySettings>) => void;
}

const AccessibilityContext = createContext<Ctx | null>(null);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(getAccessibility);

  useEffect(() => {
    saveAccessibility(settings);
    const root = document.documentElement;
    const scale = settings.fontSize === 'xl' ? '1.4' : settings.fontSize === 'large' ? '1.2' : '1';
    root.style.setProperty('--font-scale', scale);
    root.classList.toggle('high-contrast', settings.highContrast);
    root.classList.toggle('reduce-motion', settings.reducedMotion);
  }, [settings]);

  const update = (partial: Partial<AccessibilitySettings>) =>
    setSettings(prev => ({ ...prev, ...partial }));

  return (
    <AccessibilityContext.Provider value={{ settings, update }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
}
