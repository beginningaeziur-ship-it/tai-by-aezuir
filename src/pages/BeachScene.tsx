import { useState } from 'react';
import { RoomNav } from '../components/ui/RoomNav';
import { useSAI } from '../contexts/SAIContext';
import { useEmotionalState } from '../contexts/EmotionalStateContext';
import { Waves, Wind, CloudRain } from 'lucide-react';

const GROUNDING = [
  { step: 1, sense: 'See', prompt: 'Name 5 things you can see right now.' },
  { step: 2, sense: 'Touch', prompt: 'Name 4 things you can physically feel.' },
  { step: 3, sense: 'Hear', prompt: 'Name 3 things you can hear.' },
  { step: 4, sense: 'Smell', prompt: 'Name 2 things you can smell, or remember a scent you love.' },
  { step: 5, sense: 'Taste', prompt: 'Name 1 thing you can taste, or a food you enjoy.' },
];

export default function BeachScene() {
  const { saySAI } = useSAI();
  const { lowerStress } = useEmotionalState();
  const [groundStep, setGroundStep] = useState(0);
  const [mode, setMode] = useState<'idle' | 'grounding' | 'breathing'>('idle');
  const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out'>('in');

  const startGrounding = async () => {
    setMode('grounding');
    setGroundStep(0);
    await saySAI("Let's ground together. " + GROUNDING[0].prompt);
  };

  const nextGroundStep = async () => {
    if (groundStep >= GROUNDING.length - 1) {
      lowerStress(20);
      setMode('idle');
      await saySAI("You did it. How do you feel now?");
      return;
    }
    const next = groundStep + 1;
    setGroundStep(next);
    await saySAI(GROUNDING[next].prompt);
  };

  const startBreathing = async () => {
    setMode('breathing');
    setBreathPhase('in');
    await saySAI("Breathe in slowly through your nose... hold... now breathe out through your mouth.");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950 to-slate-900 flex flex-col">
      <header className="flex items-center justify-between px-4 pt-12 pb-4 safe-pt">
        <div>
          <h1 className="text-white font-semibold text-lg">Ocean</h1>
          <p className="text-slate-400 text-xs">Calm and regulate</p>
        </div>
        <RoomNav />
      </header>

      {/* Ocean visual */}
      <div className="mx-4 mt-2 h-32 rounded-2xl bg-gradient-to-b from-cyan-900/50 to-blue-950/80 border border-cyan-800/30 flex items-center justify-center overflow-hidden relative" aria-hidden>
        <div className="absolute inset-0 flex items-end">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-cyan-600/20"
              style={{
                height: `${40 + Math.sin(i * 1.2) * 20}%`,
                animation: `wave ${2 + i * 0.3}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        <Waves className="w-10 h-10 text-cyan-400/60 relative z-10" />
      </div>

      <section className="px-4 mt-6 space-y-4">
        {mode === 'idle' && (
          <>
            <h2 className="text-slate-400 text-xs font-medium uppercase tracking-wider">Tools</h2>
            <div className="space-y-3">
              <button
                onClick={startGrounding}
                className="w-full flex items-center gap-4 px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Waves className="w-6 h-6 text-cyan-400" aria-hidden />
                <div>
                  <p className="text-white font-medium">5-4-3-2-1 Grounding</p>
                  <p className="text-slate-400 text-sm">Use your senses to anchor yourself</p>
                </div>
              </button>
              <button
                onClick={startBreathing}
                className="w-full flex items-center gap-4 px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Wind className="w-6 h-6 text-blue-400" aria-hidden />
                <div>
                  <p className="text-white font-medium">Box Breathing</p>
                  <p className="text-slate-400 text-sm">Slow your nervous system down</p>
                </div>
              </button>
              <button
                onClick={() => saySAI("The rain on the ocean sounds like this — steady, constant, indifferent to everything. You can just listen.")}
                className="w-full flex items-center gap-4 px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <CloudRain className="w-6 h-6 text-slate-400" aria-hidden />
                <div>
                  <p className="text-white font-medium">Ambient Sound</p>
                  <p className="text-slate-400 text-sm">Just listen, no input needed</p>
                </div>
              </button>
            </div>
          </>
        )}

        {mode === 'grounding' && (
          <div className="space-y-4">
            <div className="bg-cyan-900/30 border border-cyan-700/30 rounded-2xl p-5">
              <p className="text-cyan-300 font-semibold text-sm mb-1">{GROUNDING[groundStep].sense}</p>
              <p className="text-white text-base">{GROUNDING[groundStep].prompt}</p>
            </div>
            <div className="flex gap-1.5 justify-center">
              {GROUNDING.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i <= groundStep ? 'bg-cyan-400 w-8' : 'bg-white/20 w-4'}`} aria-hidden />
              ))}
            </div>
            <button
              onClick={nextGroundStep}
              className="w-full py-4 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {groundStep >= GROUNDING.length - 1 ? 'Done' : 'Next'}
            </button>
            <button onClick={() => setMode('idle')} className="w-full py-2 text-slate-400 hover:text-white text-sm transition-colors">
              Stop
            </button>
          </div>
        )}

        {mode === 'breathing' && (
          <div className="space-y-6 flex flex-col items-center">
            <div
              className="w-40 h-40 rounded-full border-4 border-blue-400/50 flex items-center justify-center"
              style={{
                animation: 'breathe-expand 4s ease-in-out infinite alternate',
                background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
              }}
              role="img"
              aria-label="Breathing circle"
            >
              <p className="text-blue-300 font-medium text-lg">Breathe</p>
            </div>
            <p className="text-slate-300 text-center">In for 4 — Hold for 4 — Out for 4 — Hold for 4</p>
            <button
              onClick={() => { setMode('idle'); lowerStress(15); }}
              className="px-8 py-4 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Done
            </button>
          </div>
        )}
      </section>

      <style>{`
        @keyframes wave { from { transform: scaleY(0.8); } to { transform: scaleY(1.2); } }
        @keyframes breathe-expand { from { transform: scale(0.8); } to { transform: scale(1.15); } }
      `}</style>
    </main>
  );
}
