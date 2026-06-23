import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Waves, Trees, Settings, ChevronDown } from 'lucide-react';

const ROOMS = [
  { path: '/sai-home', label: 'Bedroom', icon: <Home className="w-5 h-5" />, desc: 'Your safe house' },
  { path: '/beach', label: 'Ocean', icon: <Waves className="w-5 h-5" />, desc: 'Calm and regulate' },
  { path: '/forest', label: 'Forest', icon: <Trees className="w-5 h-5" />, desc: 'Resources and skills' },
  { path: '/settings', label: 'Cabin', icon: <Settings className="w-5 h-5" />, desc: 'Settings and privacy' },
];

export function RoomNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const current = ROOMS.find(r => r.path === location.pathname) ?? ROOMS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Current room: ${current.label}. Change room`}
      >
        {current.icon}
        <span>{current.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
          <ul
            role="listbox"
            aria-label="Choose a room"
            className="absolute top-full mt-2 right-0 z-50 w-56 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
          >
            {ROOMS.map(room => (
              <li key={room.path} role="option" aria-selected={room.path === location.pathname}>
                <button
                  onClick={() => { navigate(room.path); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-white/10 transition-colors focus:outline-none focus:bg-white/10 ${
                    room.path === location.pathname ? 'text-blue-400' : 'text-white'
                  }`}
                >
                  <span aria-hidden>{room.icon}</span>
                  <div>
                    <div className="font-medium">{room.label}</div>
                    <div className="text-xs text-slate-400">{room.desc}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
