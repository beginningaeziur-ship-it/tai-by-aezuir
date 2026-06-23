import type { Goal, UserAssessment } from './persistence';

let _id = 0;
const uid = () => `g_${Date.now()}_${_id++}`;

export function generateGoals(assessment: UserAssessment): Goal[] {
  const now = Date.now();
  const goals: Goal[] = [];

  goals.push({ id: uid(), text: buildLongGoal(assessment), size: 'long', progress: 0, createdAt: now });

  buildMediumGoals(assessment).slice(0, 4).forEach(text =>
    goals.push({ id: uid(), text, size: 'medium', progress: 0, createdAt: now })
  );

  buildSmallGoals().slice(0, 8).forEach(text =>
    goals.push({ id: uid(), text, size: 'small', progress: 0, createdAt: now })
  );

  return goals;
}

function buildLongGoal(a: UserAssessment): string {
  if (a.primaryGoal) return a.primaryGoal;
  if (a.housingStatus === 'unstable') return 'Find and maintain stable housing';
  if (a.legalConcerns) return 'Resolve legal situation and rebuild stability';
  return 'Build a stable, grounded daily life';
}

function buildMediumGoals(a: UserAssessment): string[] {
  const goals: string[] = [];
  if (a.housingStatus === 'unstable') {
    goals.push('Connect with housing resources in my area');
    goals.push('Gather documents needed for housing applications');
  }
  if (a.legalConcerns) {
    goals.push('Find legal aid or pro bono representation');
    goals.push('Understand my rights and options');
  }
  if (a.disabilities?.length) {
    goals.push('Access disability accommodations and benefits');
    goals.push('Build a support network that understands my needs');
  }
  goals.push('Establish a calming morning routine');
  goals.push('Practice one grounding technique daily');
  goals.push('Build a small emergency fund');
  goals.push('Strengthen one supportive relationship');
  return goals;
}

function buildSmallGoals(): string[] {
  return [
    'Drink a full glass of water when I wake up',
    'Take 3 deep breaths before checking my phone',
    'Step outside for 5 minutes',
    'Eat one meal sitting down today',
    'Write one thing I am grateful for',
    'Reach out to one person today',
    'Rest for 10 minutes without guilt',
    'Complete one small task that has been waiting',
    'Say one kind thing to myself',
    'Move my body for 5 minutes',
  ];
}

export function getDailyTasks(goals: Goal[]): Goal[] {
  return goals
    .filter(g => g.size === 'small' && g.progress < 100)
    .slice(0, 3);
}

export function updateGoalProgress(goals: Goal[], id: string, progress: number): Goal[] {
  return goals.map(g => g.id === id ? { ...g, progress: Math.min(100, Math.max(0, progress)) } : g);
}
