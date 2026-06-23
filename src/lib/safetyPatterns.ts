const CRISIS = [
  'kill myself', 'end my life', 'suicide', 'suicidal', 'want to die',
  "can't go on", 'no reason to live', 'hurt myself', 'self harm',
  'overdose', 'not safe', 'in danger',
];

const STRESS = [
  'overwhelmed', "can't cope", 'too much', 'breaking down', 'falling apart',
  'panic', 'scared', 'terrified', 'hopeless', 'helpless', 'exhausted',
];

export function detectCrisis(text: string): boolean {
  const t = text.toLowerCase();
  return CRISIS.some(kw => t.includes(kw));
}

export function detectStressLevel(text: string): number {
  const t = text.toLowerCase();
  const hits = STRESS.filter(kw => t.includes(kw)).length;
  return Math.min(100, hits * 20);
}

export function getCrisisResponse(): string {
  return [
    "I hear you. You matter and you are not alone.",
    "If you are in immediate danger, please call 988 (Suicide & Crisis Lifeline) or 911.",
    "I am staying right here with you.",
  ].join(' ');
}

export function getGroundingPrompt(): string {
  return "Let's try this together. Name 5 things you can see right now. Take your time.";
}
