const K = {
  ONBOARDING_COMPLETE: 'aez:onboarding_complete',
  ONBOARDING_CHECKPOINT: 'aez:checkpoint',
  ONBOARDING_SKIPPED: 'aez:skipped',
  PIN_HASH: 'aez:pin_hash',
  ASSESSMENT: 'aez:assessment',
  SAFETY_PLAN: 'aez:safety_plan',
  GOALS: 'aez:goals',
  LIFE_ANCHOR: 'aez:life_anchor',
  STRESS_SCORE: 'aez:stress',
  ACCESSIBILITY: 'aez:a11y',
  VOICE_SETTINGS: 'aez:voice',
  EMERGENCY_CONTACT: 'aez:emergency',
  MEMOS: 'aez:memos',
};

function get<T>(key: string): T | null {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

function set<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function remove(key: string): void {
  localStorage.removeItem(key);
}

export interface UserAssessment {
  nickname?: string;
  housingStatus?: 'stable' | 'unstable' | 'transitional';
  legalConcerns?: boolean;
  disabilities?: string[];
  primaryGoal?: string;
  waterProfile?: 'stillwater' | 'stormwater' | 'tidal' | 'reservoir';
  completedAt?: number;
}

export interface SafetyPlan {
  warningSigns?: string[];
  copingStrategies?: string[];
  emergencyContact?: { name: string; phone: string };
  safePlace?: string;
  completedAt?: number;
}

export interface Goal {
  id: string;
  text: string;
  size: 'long' | 'medium' | 'small';
  progress: number;
  createdAt: number;
}

export interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'xl';
  highContrast: boolean;
  reducedMotion: boolean;
  captions: boolean;
  speechOnly: boolean;
}

export interface VoiceSettings {
  enabled: boolean;
  elevenLabsApiKey?: string;
  voiceId?: string;
  rate: number;
  pitch: number;
}

// Onboarding
export const isOnboardingComplete = () => !!get<boolean>(K.ONBOARDING_COMPLETE);
export const setOnboardingComplete = () => set(K.ONBOARDING_COMPLETE, true);
export const getCheckpoint = () => get<string>(K.ONBOARDING_CHECKPOINT);
export const setCheckpoint = (route: string) => set(K.ONBOARDING_CHECKPOINT, route);
export const clearCheckpoint = () => remove(K.ONBOARDING_CHECKPOINT);
export const isOnboardingSkipped = () => !!get<boolean>(K.ONBOARDING_SKIPPED);
export const setOnboardingSkipped = () => set(K.ONBOARDING_SKIPPED, true);

// PIN
export function hashPin(pin: string): string {
  let hash = 0;
  for (let i = 0; i < pin.length; i++) {
    hash = ((hash << 5) - hash) + pin.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}
export const savePin = (pin: string) => set(K.PIN_HASH, hashPin(pin));
export const verifyPin = (pin: string) => get<string>(K.PIN_HASH) === hashPin(pin);
export const hasPin = () => !!get<string>(K.PIN_HASH);

// Assessment
export const getAssessment = () => get<UserAssessment>(K.ASSESSMENT);
export const saveAssessment = (a: UserAssessment) => set(K.ASSESSMENT, a);

// Safety Plan
export const getSafetyPlan = () => get<SafetyPlan>(K.SAFETY_PLAN);
export const saveSafetyPlan = (p: SafetyPlan) => set(K.SAFETY_PLAN, p);

// Goals
export const getGoals = () => get<Goal[]>(K.GOALS) ?? [];
export const saveGoals = (goals: Goal[]) => set(K.GOALS, goals);

// Life Anchor
export const getLifeAnchor = () => get<string>(K.LIFE_ANCHOR);
export const saveLifeAnchor = (anchor: string) => set(K.LIFE_ANCHOR, anchor);

// Stress
export const getStressScore = () => get<number>(K.STRESS_SCORE) ?? 0;
export const saveStressScore = (score: number) =>
  set(K.STRESS_SCORE, Math.max(0, Math.min(100, score)));

// Accessibility
export const getAccessibility = (): AccessibilitySettings =>
  get<AccessibilitySettings>(K.ACCESSIBILITY) ?? {
    fontSize: 'normal',
    highContrast: false,
    reducedMotion: false,
    captions: false,
    speechOnly: false,
  };
export const saveAccessibility = (s: AccessibilitySettings) => set(K.ACCESSIBILITY, s);

// Voice
export const getVoiceSettings = (): VoiceSettings =>
  get<VoiceSettings>(K.VOICE_SETTINGS) ?? { enabled: true, rate: 1, pitch: 1 };
export const saveVoiceSettings = (s: VoiceSettings) => set(K.VOICE_SETTINGS, s);

// Emergency Contact
export const getEmergencyContact = () =>
  get<{ name: string; phone: string }>(K.EMERGENCY_CONTACT);
export const saveEmergencyContact = (c: { name: string; phone: string }) =>
  set(K.EMERGENCY_CONTACT, c);

// Memos (local only, never synced)
export const getMemos = () => get<string[]>(K.MEMOS) ?? [];
export const addMemo = (memo: string) => set(K.MEMOS, [...getMemos(), memo]);

// Full reset
export const clearAll = () => Object.values(K).forEach(remove);

// Smart launch route
export function getLaunchRoute(): string {
  if (isOnboardingComplete() || isOnboardingSkipped()) return '/sai-home';
  const checkpoint = getCheckpoint();
  if (checkpoint) return checkpoint;
  return '/onboarding/waiting-room';
}
