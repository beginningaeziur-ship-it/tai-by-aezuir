export type AppState = 'NORMAL' | 'REDUCED_LOAD' | 'SUPPORT' | 'OFFLINE';

export interface StateConfig {
  stressScore: number;
  isOffline: boolean;
}

export function computeAppState(config: StateConfig): AppState {
  if (config.isOffline) return 'OFFLINE';
  if (config.stressScore >= 70) return 'SUPPORT';
  if (config.stressScore >= 40) return 'REDUCED_LOAD';
  return 'NORMAL';
}

export function getMaxActions(state: AppState): number {
  const map: Record<AppState, number> = {
    NORMAL: 8,
    REDUCED_LOAD: 4,
    SUPPORT: 2,
    OFFLINE: 2,
  };
  return map[state];
}

export function getStateLabel(state: AppState): string {
  const map: Record<AppState, string> = {
    NORMAL: 'Doing well',
    REDUCED_LOAD: 'Taking it slow',
    SUPPORT: 'Support mode',
    OFFLINE: 'Offline',
  };
  return map[state];
}

export function getStateColor(state: AppState): string {
  const map: Record<AppState, string> = {
    NORMAL: '#4ade80',
    REDUCED_LOAD: '#facc15',
    SUPPORT: '#f97316',
    OFFLINE: '#94a3b8',
  };
  return map[state];
}

export function getStateBgClass(state: AppState): string {
  const map: Record<AppState, string> = {
    NORMAL: 'from-slate-900 via-blue-950 to-slate-900',
    REDUCED_LOAD: 'from-slate-900 via-indigo-950 to-slate-900',
    SUPPORT: 'from-slate-900 via-purple-950 to-slate-900',
    OFFLINE: 'from-slate-950 via-slate-900 to-slate-950',
  };
  return map[state];
}
