import React, { useState } from 'react';
import { savePin } from '../../lib/persistence';

interface Props {
  onComplete: () => void;
}

export function SafetyPinSetup({ onComplete }: Props) {
  const [pin, setPin] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'enter' | 'confirm'>('enter');

  const handleEnter = () => {
    if (pin.length < 4) { setError('PIN must be at least 4 digits'); return; }
    setError('');
    setStep('confirm');
  };

  const handleConfirm = () => {
    if (confirm !== pin) { setError('PINs do not match. Try again.'); setConfirm(''); return; }
    savePin(pin);
    onComplete();
  };

  const PinInput = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
    <div className="space-y-2">
      <label className="text-slate-300 text-sm block" htmlFor="pin-input">{label}</label>
      <input
        id="pin-input"
        type="password"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={8}
        value={value}
        onChange={e => onChange(e.target.value.replace(/\D/g, ''))}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="••••"
        aria-label={label}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-slate-400 text-sm">
          {step === 'enter' ? 'Create a PIN to protect your space.' : 'Enter your PIN one more time to confirm.'}
        </p>
      </div>

      {step === 'enter' ? (
        <>
          <PinInput value={pin} onChange={setPin} label="Create PIN" />
          {error && <p role="alert" className="text-red-400 text-sm text-center">{error}</p>}
          <button
            onClick={handleEnter}
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Next
          </button>
          <button
            onClick={onComplete}
            className="w-full py-3 rounded-xl text-slate-400 hover:text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Skip for now
          </button>
        </>
      ) : (
        <>
          <PinInput value={confirm} onChange={setConfirm} label="Confirm PIN" />
          {error && <p role="alert" className="text-red-400 text-sm text-center">{error}</p>}
          <button
            onClick={handleConfirm}
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Confirm
          </button>
          <button
            onClick={() => { setStep('enter'); setConfirm(''); setError(''); }}
            className="w-full py-3 rounded-xl text-slate-400 hover:text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}
