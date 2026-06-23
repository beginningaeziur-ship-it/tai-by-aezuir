import React, { createContext, useContext, useState } from 'react';
import { AppState, computeAppState } from '../lib/stateEngine';
import { getStressScore, saveStressScore } from '../lib/persistence';
import { isOffline } from '../lib/offlineMode';

interface Ctx {
  state: AppState;
  stressScore: number;
  updateStress: (score: number) => void;
  raiseStress: (by?: number) => void;
  lowerStress: (by?: number) => void;
}

const EmotionalStateContext = createContext<Ctx | null>(null);

export function EmotionalStateProvider({ children }: { children: React.ReactNode }) {
  const [stressScore, setStressScore] = useState(getStressScore);
  const state: AppState = computeAppState({ stressScore, isOffline: isOffline() });

  const updateStress = (score: number) => {
    const v = Math.max(0, Math.min(100, score));
    setStressScore(v);
    saveStressScore(v);
  };

  return (
    <EmotionalStateContext.Provider value={{
      state,
      stressScore,
      updateStress,
      raiseStress: (by = 10) => updateStress(stressScore + by),
      lowerStress: (by = 10) => updateStress(stressScore - by),
    }}>
      {children}
    </EmotionalStateContext.Provider>
  );
}

export function useEmotionalState() {
  const ctx = useContext(EmotionalStateContext);
  if (!ctx) throw new Error('useEmotionalState must be used within EmotionalStateProvider');
  return ctx;
}
