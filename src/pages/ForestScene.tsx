import { useState } from 'react';
import { RoomNav } from '../components/ui/RoomNav';
import { Trees, MapPin, Phone, FileText, ExternalLink } from 'lucide-react';
import { getAssessment } from '../lib/persistence';

const RESOURCES = [
  {
    category: 'Crisis Support',
    items: [
      { name: '988 Suicide & Crisis Lifeline', detail: 'Call or text 988 — free, 24/7', action: 'tel:988', icon: <Phone className="w-4 h-4" /> },
      { name: 'Crisis Text Line', detail: 'Text HOME to 741741', action: 'sms:741741', icon: <Phone className="w-4 h-4" /> },
    ],
  },
  {
    category: 'Housing',
    items: [
      { name: 'HUD Housing Help', detail: 'Find local housing assistance', action: 'https://www.hud.gov/findhousing', icon: <MapPin className="w-4 h-4" /> },
      { name: '211 Helpline', detail: 'Local social services', action: 'tel:211', icon: <Phone className="w-4 h-4" /> },
    ],
  },
  {
    category: 'Legal Aid',
    items: [
      { name: 'LawHelp.org', detail: 'Free legal help by state', action: 'https://www.lawhelp.org', icon: <FileText className="w-4 h-4" /> },
      { name: 'Legal Services Corporation', detail: 'Pro bono legal representation', action: 'https://www.lsc.gov/what-legal-aid', icon: <FileText className="w-4 h-4" /> },
    ],
  },
  {
    category: 'Disability',
    items: [
      { name: 'Disability Rights Advocates', detail: 'Know your rights', action: 'https://dralegal.org', icon: <ExternalLink className="w-4 h-4" /> },
      { name: 'SSA Benefits', detail: 'Social Security disability info', action: 'https://www.ssa.gov/disability', icon: <ExternalLink className="w-4 h-4" /> },
    ],
  },
];

export default function ForestScene() {
  const [expanded, setExpanded] = useState<string | null>('Crisis Support');
  const assessment = getAssessment();

  const prioritized = [...RESOURCES].sort((a, b) => {
    const priority = [];
    if (assessment?.housingStatus === 'unstable') priority.push('Housing');
    if (assessment?.legalConcerns) priority.push('Legal Aid');
    if (assessment?.disabilities?.length) priority.push('Disability');
    priority.push('Crisis Support');
    return priority.indexOf(a.category) - priority.indexOf(b.category);
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950 to-slate-900 flex flex-col">
      <header className="flex items-center justify-between px-4 pt-12 pb-4 safe-pt">
        <div>
          <h1 className="text-white font-semibold text-lg">Forest</h1>
          <p className="text-slate-400 text-xs">Resources and real-world support</p>
        </div>
        <RoomNav />
      </header>

      <div className="mx-4 mt-2 h-24 rounded-2xl bg-gradient-to-b from-green-900/40 to-emerald-950/60 border border-green-800/30 flex items-center justify-center" aria-hidden>
        <Trees className="w-10 h-10 text-green-400/60" />
      </div>

      <section className="px-4 mt-6 space-y-3 pb-8 safe-pb">
        <h2 className="text-slate-400 text-xs font-medium uppercase tracking-wider">Resources</h2>
        {prioritized.map(group => (
          <div key={group.category} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpanded(e => e === group.category ? null : group.category)}
              className="w-full flex items-center justify-between px-4 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-expanded={expanded === group.category}
            >
              <span className="text-white font-medium">{group.category}</span>
              <span className="text-slate-400 text-lg" aria-hidden>{expanded === group.category ? '−' : '+'}</span>
            </button>
            {expanded === group.category && (
              <div className="border-t border-white/10">
                {group.items.map(item => (
                  <a
                    key={item.name}
                    href={item.action}
                    target={item.action.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-4 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label={`${item.name}: ${item.detail}`}
                  >
                    <span className="text-green-400 shrink-0" aria-hidden>{item.icon}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <p className="text-slate-400 text-xs">{item.detail}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
