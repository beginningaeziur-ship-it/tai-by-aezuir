export interface NineStep {
  number: number;
  name: string;
  description: string;
  prompt: string;
  options: [string, string];
}

export const NINE_STEPS: NineStep[] = [
  {
    number: 1,
    name: 'Notice',
    description: 'Become aware of what is happening in your body and mind.',
    prompt: 'Something feels off. Do you want to pause and notice, or keep going?',
    options: ['Pause and notice', 'Keep going'],
  },
  {
    number: 2,
    name: 'Protect',
    description: 'Create safety for yourself right now.',
    prompt: 'You deserve to feel safe. Find a safer space, or stay here?',
    options: ['Find safer space', 'Stay here'],
  },
  {
    number: 3,
    name: 'Regulate',
    description: 'Calm your nervous system.',
    prompt: 'Your body needs to regulate. Try a breathing exercise, or skip for now?',
    options: ['Try breathing', 'Skip for now'],
  },
  {
    number: 4,
    name: 'Understand',
    description: 'Make sense of what triggered this response.',
    prompt: 'Explore what triggered this, or let it go for now?',
    options: ['Explore trigger', 'Let it go'],
  },
  {
    number: 5,
    name: 'Identify',
    description: 'Name the need underneath the feeling.',
    prompt: 'There is a need under this feeling. Name it, or just sit with it?',
    options: ['Name the need', 'Sit with it'],
  },
  {
    number: 6,
    name: 'Choose',
    description: 'Select a response that honors your need.',
    prompt: 'You have a choice here. Pick an action, or wait a bit longer?',
    options: ['Pick an action', 'Wait a bit'],
  },
  {
    number: 7,
    name: 'Replace',
    description: 'Swap an old pattern for a new one.',
    prompt: 'Try a new way of responding, or stick with what you know?',
    options: ['Try new way', 'Stick with known'],
  },
  {
    number: 8,
    name: 'Repair',
    description: 'Heal what was damaged.',
    prompt: 'Ready to take a small repair step, or not yet?',
    options: ['Small repair step', 'Not yet'],
  },
  {
    number: 9,
    name: 'Build',
    description: 'Strengthen the new pattern through practice.',
    prompt: 'Build on this progress, or rest for now?',
    options: ['Build on progress', 'Rest for now'],
  },
];

export function getStepForStress(score: number): NineStep {
  if (score >= 80) return NINE_STEPS[1]; // Protect
  if (score >= 60) return NINE_STEPS[2]; // Regulate
  if (score >= 40) return NINE_STEPS[0]; // Notice
  return NINE_STEPS[5]; // Choose
}
