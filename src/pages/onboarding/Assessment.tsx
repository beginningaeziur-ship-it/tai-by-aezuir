import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FullBodySAI } from '../../components/sai/FullBodySAI';
import { saveAssessment, setCheckpoint, UserAssessment } from '../../lib/persistence';

type Step = 'housing' | 'legal' | 'disability' | 'goal';
const STEPS: Step[] = ['housing', 'legal', 'disability', 'goal'];

export default function Assessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<UserAssessment>({});
  const [goalText, setGoalText] = useState('');

  const current = STEPS[step];

  const next = (partial: Partial<UserAssessment>) => {
    const updated = { ...data, ...partial };
    setData(updated);
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      const final = { ...updated, completedAt: Date.now() };
      saveAssessment(final);
      setCheckpoint('/onboarding/safety-plan');
      navigate('/onboarding/safety-plan');
    }
  };

  const Btn = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="w-full py-4 rounded-xl bg-white/10 hover:bg-blue-600/40 border border-white/10 hover:border-blue-500/50 text-white font-medium text-sm text-left px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {label}
    </button>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 flex flex-col items-center justify-end pb-8 px-4">
      <div className="flex-1 flex flex-col items-center justify-center gap-4 w-full max-w-sm pt-12">
        <FullBodySAI size="md" />
        <div className="flex gap-1.5" aria-label={`Question ${step + 1} of ${STEPS.length}`}>
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? 'bg-blue-400 w-8' : 'bg-white/20 w-4'}`} aria-hidden />
          ))}
        </div>
      </div>

      <div className="w-full max-w-sm space-y-4">
        {current === 'housing' && (
          <>
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-white text-base text-center">How is your housing situation right now? No judgment, just so I can understand.</p>
            </div>
            <div className="space-y-2">
              <Btn label="🏠 I have stable housing" onClick={() => next({ housingStatus: 'stable' })} />
              <Btn label="🚶 In between or transitional" onClick={() => next({ housingStatus: 'transitional' })} />
              <Btn label="🙏 It's unstable right now" onClick={() => next({ housingStatus: 'unstable' })} />
              <Btn label="I'd rather not say" onClick={() => next({})} />
            </div>
          </>
        )}

        {current === 'legal' && (
          <>
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-white text-base text-center">Are there any legal matters I should know about so I can point you to the right resources?</p>
            </div>
            <div className="space-y-2">
              <Btn label="Yes, there are some things" onClick={() => next({ legalConcerns: true })} />
              <Btn label="Not right now" onClick={() => next({ legalConcerns: false })} />
              <Btn label="I'd rather not say" onClick={() => next({})} />
            </div>
          </>
        )}

        {current === 'disability' && (
          <>
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-white text-base text-center">Do you have any disabilities or health conditions I should be aware of? This helps me support you better.</p>
            </div>
            <div className="space-y-2">
              <Btn label="Physical disability" onClick={() => next({ disabilities: ['physical'] })} />
              <Btn label="Mental health condition" onClick={() => next({ disabilities: ['mental_health'] })} />
              <Btn label="Both physical and mental health" onClick={() => next({ disabilities: ['physical', 'mental_health'] })} />
              <Btn label="No, or I'd rather not say" onClick={() => next({})} />
            </div>
          </>
        )}

        {current === 'goal' && (
          <>
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-white text-base text-center">Last one. What's the one thing you most want help with right now? (optional — you can always add this later)</p>
            </div>
            <textarea
              value={goalText}
              onChange={e => setGoalText(e.target.value)}
              placeholder="Type here or skip..."
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              aria-label="Your main goal"
            />
            <button
              onClick={() => next({ primaryGoal: goalText || undefined })}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {goalText ? "Let's go" : 'Skip for now'}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
