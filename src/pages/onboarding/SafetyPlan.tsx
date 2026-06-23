import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FullBodySAI } from '../../components/sai/FullBodySAI';
import { saveSafetyPlan, saveEmergencyContact, setCheckpoint } from '../../lib/persistence';

export default function SafetyPlan() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [safePlace, setSafePlace] = useState('');
  const [skipped, setSkipped] = useState(false);

  const finish = (skip = false) => {
    if (!skip && (name || phone)) {
      saveEmergencyContact({ name, phone });
    }
    saveSafetyPlan({
      safePlace: safePlace || undefined,
      completedAt: Date.now(),
    });
    setCheckpoint('/onboarding/exit');
    navigate('/onboarding/exit');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 flex flex-col items-center justify-end pb-8 px-4">
      <div className="flex-1 flex flex-col items-center justify-center pt-12">
        <FullBodySAI size="md" />
      </div>

      <div className="w-full max-w-sm space-y-4">
        <div className="bg-white/10 rounded-2xl p-4">
          <p className="text-white text-base text-center">
            One more important thing. If things ever get really hard, who could you call? And where do you feel most safe?
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-slate-300 text-sm block mb-1" htmlFor="ec-name">Emergency contact name (optional)</label>
            <input
              id="ec-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="text-slate-300 text-sm block mb-1" htmlFor="ec-phone">Their phone number (optional)</label>
            <input
              id="ec-phone"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Phone number"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="text-slate-300 text-sm block mb-1" htmlFor="safe-place">Where do you feel safest? (optional)</label>
            <input
              id="safe-place"
              type="text"
              value={safePlace}
              onChange={e => setSafePlace(e.target.value)}
              placeholder="e.g. my room, the library..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <button
          onClick={() => finish(false)}
          className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {name || phone || safePlace ? 'Save and continue' : 'Continue'}
        </button>
        <button
          onClick={() => finish(true)}
          className="w-full py-3 text-slate-400 hover:text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          Skip for now
        </button>
      </div>
    </main>
  );
}
