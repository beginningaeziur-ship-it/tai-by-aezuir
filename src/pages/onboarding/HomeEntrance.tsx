import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FullBodySAI } from '../../components/sai/FullBodySAI';
import { SafetyPinSetup } from '../../components/onboarding/SafetyPinSetup';
import { setOnboardingComplete, clearCheckpoint, generateGoals, saveGoals, getAssessment } from '../../lib/persistence';
import { generateGoals as genGoals } from '../../lib/goalGenerator';

export default function HomeEntrance() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'pin' | 'done'>('pin');

  const finish = () => {
    const assessment = getAssessment();
    if (assessment) {
      const goals = genGoals(assessment);
      saveGoals(goals);
    }
    setOnboardingComplete();
    clearCheckpoint();
    navigate('/sai-home', { replace: true });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 flex flex-col items-center justify-end pb-8 px-4">
      <div className="flex-1 flex flex-col items-center justify-center pt-12 gap-4">
        <FullBodySAI size="lg" />
        <div className="text-center">
          <p className="text-white font-semibold text-xl">Welcome home.</p>
          <p className="text-slate-400 text-sm mt-1">This space is yours.</p>
        </div>
      </div>

      <div className="w-full max-w-sm">
        {step === 'pin' && (
          <SafetyPinSetup onComplete={finish} />
        )}
      </div>
    </main>
  );
}
