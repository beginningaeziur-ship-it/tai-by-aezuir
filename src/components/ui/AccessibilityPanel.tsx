import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { Eye, Volume2, Zap, Captions } from 'lucide-react';

export function AccessibilityPanel() {
  const { settings, update } = useAccessibility();

  const Toggle = ({ label, value, onChange, icon }: {
    label: string; value: boolean; onChange: (v: boolean) => void; icon: React.ReactNode;
  }) => (
    <button
      onClick={() => onChange(!value)}
      className={`flex items-center gap-3 w-full px-4 py-4 rounded-xl text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        value ? 'bg-blue-600/30 border border-blue-500/50' : 'bg-white/5 border border-white/10 hover:bg-white/10'
      }`}
      aria-pressed={value}
    >
      <span className="text-blue-400" aria-hidden>{icon}</span>
      <span className="text-white font-medium">{label}</span>
      <span className={`ml-auto w-10 h-6 rounded-full transition-colors ${value ? 'bg-blue-500' : 'bg-slate-600'}`}>
        <span className={`block w-5 h-5 mt-0.5 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </span>
    </button>
  );

  return (
    <section aria-label="Accessibility settings" className="space-y-3">
      <h2 className="text-white font-semibold text-lg mb-4">Accessibility</h2>

      <div className="space-y-2 mb-4">
        <label className="text-slate-300 text-sm" id="font-size-label">Text size</label>
        <div className="flex gap-2" role="group" aria-labelledby="font-size-label">
          {(['normal', 'large', 'xl'] as const).map(s => (
            <button
              key={s}
              onClick={() => update({ fontSize: s })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                settings.fontSize === s ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
              aria-pressed={settings.fontSize === s}
            >
              {s === 'normal' ? 'Normal' : s === 'large' ? 'Large' : 'Extra large'}
            </button>
          ))}
        </div>
      </div>

      <Toggle label="High contrast" value={settings.highContrast} onChange={v => update({ highContrast: v })} icon={<Eye className="w-5 h-5" />} />
      <Toggle label="Reduce motion" value={settings.reducedMotion} onChange={v => update({ reducedMotion: v })} icon={<Zap className="w-5 h-5" />} />
      <Toggle label="Captions" value={settings.captions} onChange={v => update({ captions: v })} icon={<Captions className="w-5 h-5" />} />
      <Toggle label="Speech only mode" value={settings.speechOnly} onChange={v => update({ speechOnly: v })} icon={<Volume2 className="w-5 h-5" />} />
    </section>
  );
}
