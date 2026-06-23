import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConversationalScreen } from '../../components/onboarding/ConversationalScreen';
import { setCheckpoint } from '../../lib/persistence';

const STEPS = [
  {
    message: "I'm SAI — an AI companion, not a therapist or doctor. I can’t give medical or legal advice. But I can be here, help you think, and walk alongside you.",
    a: "That makes sense",
    b: "Tell me more",
  },
  {
    message: "Everything you share with me stays on your device. I don't send your private notes or journals anywhere. You're always in control.",
    a: "Good to know",
    b: "How does that work?",
  },
  {
    message: "If things ever feel like too much, I’ll always show you two options — never a wall of choices. And you can always just say 'stop' and I’ll slow down.",
    a: "I like that",
    b: "What if I need real help?",
  },
  {
    message: "If you’re ever in crisis, I'll always point you to 988 (the Suicide & Crisis Lifeline) or 911. I’m not a replacement for real human support — I’m a companion.",
    a: "Understood",
    b: "Okay, I'm ready",
  },
];

export default function SecurityBriefing() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      setCheckpoint('/onboarding/assessment');
      navigate('/onboarding/assessment');
    }
  };

  const s = STEPS[step];

  return (
    <ConversationalScreen
      message={s.message}
      optionA={s.a}
      optionB={s.b}
      onA={next}
      onB={next}
    >
      <div className="flex gap-1.5" aria-label={`Step ${step + 1} of ${STEPS.length}`} role="group">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i <= step ? 'bg-blue-400 w-8' : 'bg-white/20 w-4'
            }`}
            aria-hidden
          />
        ))}
      </div>
    </ConversationalScreen>
  );
}
