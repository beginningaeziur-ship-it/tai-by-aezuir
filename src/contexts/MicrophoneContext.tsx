import React, { createContext, useContext, useState } from 'react';

interface Ctx {
  micEnabled: boolean;
  setMicEnabled: (v: boolean) => void;
  micConsented: boolean;
  setMicConsented: (v: boolean) => void;
}

const MicrophoneContext = createContext<Ctx | null>(null);

export function MicrophoneProvider({ children }: { children: React.ReactNode }) {
  const [micEnabled, setMicEnabled] = useState(false);
  const [micConsented, setMicConsented] = useState(false);
  return (
    <MicrophoneContext.Provider value={{ micEnabled, setMicEnabled, micConsented, setMicConsented }}>
      {children}
    </MicrophoneContext.Provider>
  );
}

export function useMicrophone() {
  const ctx = useContext(MicrophoneContext);
  if (!ctx) throw new Error('useMicrophone must be used within MicrophoneProvider');
  return ctx;
}
