import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { isOffline, onNetworkChange } from '../../lib/offlineMode';

export function OfflineStatusBanner() {
  const [offline, setOffline] = useState(isOffline);

  useEffect(() => onNetworkChange(online => setOffline(!online)), []);

  if (!offline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-center gap-2 bg-slate-800 border-b border-slate-700 py-2 px-4 text-sm text-slate-300"
    >
      <WifiOff className="w-4 h-4" aria-hidden />
      <span>Offline — SAI is still here with you</span>
    </div>
  );
}
