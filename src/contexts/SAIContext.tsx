import React, { createContext, useContext, useState, useCallback } from 'react';
import { useTTS } from '../hooks/useTTS';
import { detectCrisis, getCrisisResponse, detectStressLevel } from '../lib/safetyPatterns';
import { useEmotionalState } from './EmotionalStateContext';

interface Ctx {
  speaking: boolean;
  lastMessage: string;
  saySAI: (msg: string) => Promise<void>;
  respondToUser: (input: string) => Promise<void>;
}

const SAIContext = createContext<Ctx | null>(null);

const RESPONSES: [RegExp, string][] = [
  [/tired|exhausted|no energy/i, "Rest is not giving up. It is how you keep going. Take as long as you need."],
  [/scared|anxious|worried|fear/i, "Fear is your body trying to protect you. You are safe right now, in this moment."],
  [/good|better|okay|great|happy/i, "That genuinely matters. Even a small shift toward okay is real progress."],
  [/help|lost|stuck|don't know/i, "I am right here. You do not have to figure it all out at once. One tiny step is enough."],
  [/thank/i, "Always. This is what I am here for."],
  [/alone|lonely/i, "You are not alone right now. I am here. And you have made it this far, which is no small thing."],
  [/angry|mad|frustrated/i, "That anger makes sense. You are allowed to feel it. What happened?"],
  [/sad|crying|cry/i, "Tears are not weakness. They are your body releasing something heavy. I am here."],
];

export function SAIProvider({ children }: { children: React.ReactNode }) {
  const [speaking, setSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState('');
  const { speak } = useTTS();
  const { raiseStress, lowerStress } = useEmotionalState();

  const saySAI = useCallback(async (msg: string) => {
    setLastMessage(msg);
    setSpeaking(true);
    try { await speak(msg); } finally { setSpeaking(false); }
  }, [speak]);

  const respondToUser = useCallback(async (input: string) => {
    if (detectCrisis(input)) {
      raiseStress(30);
      await saySAI(getCrisisResponse());
      return;
    }
    const stressHit = detectStressLevel(input);
    if (stressHit > 0) raiseStress(stressHit / 4);

    for (const [pattern, response] of RESPONSES) {
      if (pattern.test(input)) { await saySAI(response); lowerStress(5); return; }
    }
    await saySAI("I hear you. Whatever you are feeling right now is valid. I am not going anywhere.");
  }, [saySAI, raiseStress, lowerStress]);

  return (
    <SAIContext.Provider value={{ speaking, lastMessage, saySAI, respondToUser }}>
      {children}
    </SAIContext.Provider>
  );
}

export function useSAI() {
  const ctx = useContext(SAIContext);
  if (!ctx) throw new Error('useSAI must be used within SAIProvider');
  return ctx;
}
