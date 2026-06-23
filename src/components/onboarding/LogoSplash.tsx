import React, { useEffect } from 'react';

interface Props {
  onDone: () => void;
}

export function LogoSplash({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950"
      role="status"
      aria-label="Loading AEZUIR"
    >
      <div className="flex flex-col items-center gap-6 animate-pulse">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center shadow-2xl shadow-blue-500/30">
          <span className="text-white font-black text-4xl tracking-tight">A</span>
        </div>
        <div className="text-center">
          <p className="text-white font-bold text-2xl tracking-wide">AEZUIR</p>
          <p className="text-slate-400 text-sm mt-1">SAI — your companion</p>
        </div>
      </div>
      <div className="absolute bottom-12 flex gap-1">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
