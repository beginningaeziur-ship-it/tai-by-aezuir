import { RoomNav } from '../components/ui/RoomNav';
import { useNavigate } from 'react-router-dom';
import { QrCode, Users, TrendingUp, Shield } from 'lucide-react';

export default function Watcher() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-violet-950 to-slate-900 flex flex-col">
      <header className="flex items-center justify-between px-4 pt-12 pb-4 safe-pt">
        <div>
          <h1 className="text-white font-semibold text-lg">PAI</h1>
          <p className="text-slate-400 text-xs">Professional companion dashboard</p>
        </div>
        <RoomNav />
      </header>

      <section className="px-4 mt-6 space-y-4">
        <div className="bg-violet-900/30 border border-violet-700/30 rounded-2xl p-4">
          <p className="text-violet-200 text-sm">
            PAI shows aggregated progress metrics only. It never displays private notes, journals, or conversations.
            The user controls what is shared and can revoke access at any time.
          </p>
        </div>

        <div className="space-y-3">
          <button
            className="w-full flex items-center gap-4 px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => {}}
          >
            <QrCode className="w-6 h-6 text-violet-400" aria-hidden />
            <div>
              <p className="text-white font-medium">Connect via QR</p>
              <p className="text-slate-400 text-sm">Generate a connection code for a professional</p>
            </div>
          </button>

          <button
            className="w-full flex items-center gap-4 px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => {}}
          >
            <TrendingUp className="w-6 h-6 text-green-400" aria-hidden />
            <div>
              <p className="text-white font-medium">Stability Trends</p>
              <p className="text-slate-400 text-sm">Aggregated progress — visible to connected professionals</p>
            </div>
          </button>

          <button
            className="w-full flex items-center gap-4 px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => {}}
          >
            <Users className="w-6 h-6 text-blue-400" aria-hidden />
            <div>
              <p className="text-white font-medium">Connected Professionals</p>
              <p className="text-slate-400 text-sm">Manage who has access</p>
            </div>
          </button>

          <button
            className="w-full flex items-center gap-4 px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => {}}
          >
            <Shield className="w-6 h-6 text-amber-400" aria-hidden />
            <div>
              <p className="text-white font-medium">Privacy Controls</p>
              <p className="text-slate-400 text-sm">Revoke access or adjust sharing</p>
            </div>
          </button>
        </div>

        <button
          onClick={() => navigate('/sai-home')}
          className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Back to my space
        </button>
      </section>
    </main>
  );
}
