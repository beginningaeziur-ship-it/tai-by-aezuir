import React from 'react';
import { useEmotionalState } from '../../contexts/EmotionalStateContext';
import { getStateColor } from '../../lib/stateEngine';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  speaking?: boolean;
}

export function FullBodySAI({ size = 'lg', speaking = false }: Props) {
  const { state } = useEmotionalState();
  const statusColor = getStateColor(state);
  const dim = size === 'lg' ? 240 : size === 'md' ? 160 : 100;

  return (
    <div
      className="flex flex-col items-center select-none"
      aria-label="SAI, your AI companion"
      role="img"
    >
      <svg
        width={dim}
        height={dim * 1.1}
        viewBox="0 0 200 220"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: 'drop-shadow(0 8px 24px rgba(100,160,255,0.18))',
          animation: speaking ? 'sai-speak 0.4s ease-in-out infinite alternate' : 'sai-breathe 3s ease-in-out infinite',
        }}
      >
        {/* Ground shadow */}
        <ellipse cx="100" cy="215" rx="65" ry="8" fill="rgba(0,0,0,0.18)" />

        {/* Body */}
        <rect x="45" y="120" width="110" height="80" rx="22" fill="#2d4a6e" />
        <rect x="55" y="128" width="90" height="64" rx="16" fill="#3a5f8a" />

        {/* Chest belly */}
        <ellipse cx="100" cy="162" rx="32" ry="24" fill="#4a7aaa" opacity="0.5" />

        {/* Status light */}
        <circle cx="100" cy="152" r="7" fill={statusColor} />
        <circle cx="100" cy="152" r="4" fill="white" opacity="0.35" />

        {/* Tail */}
        <path
          d="M155,148 Q182,128 176,104"
          stroke="#2d4a6e"
          strokeWidth="13"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M155,148 Q182,128 176,104"
          stroke="#3a5f8a"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />

        {/* Head */}
        <rect x="48" y="55" width="104" height="80" rx="20" fill="#2d4a6e" />
        <rect x="54" y="61" width="92" height="68" rx="16" fill="#3a5f8a" />

        {/* Ears */}
        <path d="M60,65 L48,34 L80,52 Z" fill="#2d4a6e" />
        <path d="M140,65 L152,34 L120,52 Z" fill="#2d4a6e" />
        <path d="M62,63 L52,38 L78,54 Z" fill="#3a5f8a" />
        <path d="M138,63 L148,38 L122,54 Z" fill="#3a5f8a" />

        {/* Eyes */}
        <circle cx="78" cy="88" r="16" fill="#0a1628" />
        <circle cx="122" cy="88" r="16" fill="#0a1628" />
        {/* Eye glow */}
        <circle cx="78" cy="88" r="10" fill="#1a6aff" opacity="0.6" />
        <circle cx="122" cy="88" r="10" fill="#1a6aff" opacity="0.6" />
        {/* Eye highlight */}
        <circle cx="83" cy="82" r="5" fill="white" opacity="0.85" />
        <circle cx="127" cy="82" r="5" fill="white" opacity="0.85" />
        {/* Pupil */}
        <circle cx="78" cy="88" r="5" fill="#3399ff" />
        <circle cx="122" cy="88" r="5" fill="#3399ff" />

        {/* Snout */}
        <rect x="72" y="105" width="56" height="26" rx="13" fill="#2d4a6e" />
        <rect x="76" y="108" width="48" height="20" rx="10" fill="#3a5f8a" />
        {/* Nose */}
        <ellipse cx="100" cy="113" rx="9" ry="6" fill="#0a1628" />
        <ellipse cx="100" cy="111" rx="4" ry="2" fill="#2a3a5a" />

        {/* Mouth (tiny smile) */}
        <path d="M90,120 Q100,126 110,120" stroke="#1a3a5a" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Front legs */}
        <rect x="55" y="188" width="26" height="30" rx="12" fill="#2d4a6e" />
        <rect x="119" y="188" width="26" height="30" rx="12" fill="#2d4a6e" />
        <rect x="59" y="192" width="18" height="22" rx="9" fill="#3a5f8a" />
        <rect x="123" y="192" width="18" height="22" rx="9" fill="#3a5f8a" />
        {/* Feet */}
        <ellipse cx="68" cy="216" rx="13" ry="6" fill="#2d4a6e" />
        <ellipse cx="132" cy="216" rx="13" ry="6" fill="#2d4a6e" />

        {/* Back legs */}
        <rect x="60" y="182" width="20" height="26" rx="10" fill="#233d5a" />
        <rect x="120" y="182" width="20" height="26" rx="10" fill="#233d5a" />

        {/* Chest pattern */}
        <rect x="88" y="138" width="5" height="14" rx="2" fill="#5a8abf" opacity="0.4" />
        <rect x="97" y="135" width="5" height="17" rx="2" fill="#5a8abf" opacity="0.4" />
        <rect x="106" y="138" width="5" height="14" rx="2" fill="#5a8abf" opacity="0.4" />
      </svg>

      <style>{`
        @keyframes sai-breathe {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes sai-speak {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(1.02); }
        }
      `}</style>
    </div>
  );
}
