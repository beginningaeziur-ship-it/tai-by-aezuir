import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomNav } from '../components/ui/RoomNav';
import { AccessibilityPanel } from '../components/ui/AccessibilityPanel';
import { useVoiceSettings } from '../contexts/VoiceSettingsContext';
import { clearAll, getEmergencyContact, getSafetyPlan } from '../lib/persistence';
import { EL_VOICES } from '../lib/elevenlabs';
import { Settings as SettingsIcon, Volume2, Lock, Trash2 } from 'lucide-react';

type Tab = 'accessibility' | 'voice' | 'privacy';

export default function Settings() {
  const navigate = useNavigate();
  const { voiceSettings, updateVoice } = useVoiceSettings();
  const [tab, setTab] = useState<Tab>('accessibility');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const ec = getEmergencyContact();
  const sp = getSafetyPlan();

  const handleDelete = () => {
    clearAll();
    navigate('/', { replace: true });
  };

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'accessibility', label: 'Access', icon: <SettingsIcon className="w-4 h-4" /> },
    { id: 'voice', label: 'Voice', icon: <Volume2 className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy', icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950 to-slate-900 flex flex-col">
      <header className="flex items-center justify-between px-4 pt-12 pb-4 safe-pt">
        <div>
          <h1 className="text-white font-semibold text-lg">Cabin</h1>
          <p className="text-slate-400 text-xs">Settings and privacy</p>
        </div>
        <RoomNav />
      </header>

      {/* Tabs */}
      <div className="px-4 mt-2">
        <div className="flex bg-white/5 rounded-xl p-1" role="tablist">
          {TABS.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                tab === t.id ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span aria-hidden>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <section className="px-4 mt-6 pb-8 safe-pb">
        {tab === 'accessibility' && <AccessibilityPanel />}

        {tab === 'voice' && (
          <div className="space-y-4">
            <h2 className="text-white font-semibold text-lg">Voice</h2>
            <label className="flex items-center justify-between px-4 py-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer">
              <span className="text-white">Voice enabled</span>
              <input
                type="checkbox"
                checked={voiceSettings.enabled}
                onChange={e => updateVoice({ enabled: e.target.checked })}
                className="sr-only"
                aria-label="Toggle voice"
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${voiceSettings.enabled ? 'bg-blue-500' : 'bg-slate-600'}`}>
                <div className={`w-5 h-5 mt-0.5 rounded-full bg-white shadow transition-transform ${voiceSettings.enabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </div>
            </label>

            <div className="space-y-2">
              <label className="text-slate-300 text-sm block" htmlFor="el-key">ElevenLabs API key (optional)</label>
              <input
                id="el-key"
                type="password"
                value={voiceSettings.elevenLabsApiKey ?? ''}
                onChange={e => updateVoice({ elevenLabsApiKey: e.target.value })}
                placeholder="sk-..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-slate-500 text-xs">Adds natural voice. Stored locally only, never sent anywhere except ElevenLabs.</p>
            </div>

            <div className="space-y-2">
              <p className="text-slate-300 text-sm">Voice</p>
              <div className="space-y-2">
                {EL_VOICES.map(v => (
                  <button
                    key={v.id}
                    onClick={() => updateVoice({ voiceId: v.id })}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      voiceSettings.voiceId === v.id
                        ? 'border-blue-500 bg-blue-600/20 text-white'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                    aria-pressed={voiceSettings.voiceId === v.id}
                  >
                    <span className="font-medium">{v.name}</span>
                    <span className="text-xs text-slate-400 ml-auto">{v.mood}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-white font-semibold text-lg">Privacy & Data</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <p className="text-slate-300 text-sm">
                All your data — journals, goals, notes, your safety plan — stays on this device only.
                Nothing is sent to a server without your explicit action.
              </p>
              {ec && (
                <div className="text-slate-400 text-sm">
                  <span className="text-slate-500">Emergency contact: </span>
                  {ec.name} {ec.phone && `• ${ec.phone}`}
                </div>
              )}
              {sp?.safePlace && (
                <div className="text-slate-400 text-sm">
                  <span className="text-slate-500">Safe place: </span>{sp.safePlace}
                </div>
              )}
            </div>

            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-red-900/30 hover:bg-red-900/50 border border-red-800/50 text-red-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <Trash2 className="w-4 h-4" aria-hidden />
                Delete all my data
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-red-300 text-sm text-center">This cannot be undone. Are you sure?</p>
                <button onClick={handleDelete} className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors">
                  Yes, delete everything
                </button>
                <button onClick={() => setConfirmDelete(false)} className="w-full py-3 text-slate-400 hover:text-white text-sm transition-colors">
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
