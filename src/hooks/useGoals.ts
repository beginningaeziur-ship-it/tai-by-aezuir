import { useState, useCallback } from 'react';
import { Goal, getGoals, saveGoals } from '../lib/persistence';
import { updateGoalProgress } from '../lib/goalGenerator';

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>(getGoals);

  const setProgress = useCallback((id: string, progress: number) => {
    setGoals(prev => {
      const next = updateGoalProgress(prev, id, progress);
      saveGoals(next);
      return next;
    });
  }, []);

  const completeGoal = useCallback((id: string) => setProgress(id, 100), [setProgress]);

  const refreshGoals = useCallback(() => setGoals(getGoals()), []);

  return { goals, setProgress, completeGoal, refreshGoals };
}
