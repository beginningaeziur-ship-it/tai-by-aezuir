import type { AppState } from './stateEngine';

export interface TwoOptionPrompt {
  message: string;
  optionA: string;
  optionB: string;
}

type PromptContext = 'greeting' | 'checkin' | 'goal' | 'crisis' | 'general';

const PROMPTS: Record<AppState, Record<PromptContext, TwoOptionPrompt>> = {
  NORMAL: {
    greeting: {
      message: 'Good to see you. How are things going today?',
      optionA: 'Pretty good actually',
      optionB: 'Not my best day',
    },
    checkin: {
      message: "How's your energy right now?",
      optionA: 'I have energy to spare',
      optionB: 'Running on empty',
    },
    goal: {
      message: 'Want to work on something today?',
      optionA: "Yes, let's do something",
      optionB: 'Just want to rest',
    },
    crisis: {
      message: "I'm here with you. What do you need most right now?",
      optionA: 'Help me breathe',
      optionB: 'Just be with me',
    },
    general: {
      message: 'What feels right for you right now?',
      optionA: "Let's move forward",
      optionB: 'I need a moment',
    },
  },
  REDUCED_LOAD: {
    greeting: {
      message: "Hey. I noticed things feel heavier today. That's okay.",
      optionA: 'Yeah, rough day',
      optionB: "I'm managing",
    },
    checkin: {
      message: "You're doing a lot. Want to check in or just rest?",
      optionA: 'Quick check-in',
      optionB: 'Just rest',
    },
    goal: {
      message: 'Even small steps count. Want to try one tiny thing?',
      optionA: 'One tiny thing',
      optionB: 'Not today',
    },
    crisis: {
      message: "I've got you. Let's slow everything down together.",
      optionA: 'Help me slow down',
      optionB: 'Stay close',
    },
    general: {
      message: 'No rush. What feels manageable?',
      optionA: 'Something small',
      optionB: 'Nothing yet',
    },
  },
  SUPPORT: {
    greeting: {
      message: "I'm right here. You don't have to do anything.",
      optionA: 'Stay with me',
      optionB: 'I need help',
    },
    checkin: {
      message: 'Just two options. Which feels true?',
      optionA: "I'm struggling",
      optionB: "I'm okay",
    },
    goal: {
      message: 'Forget goals right now. Do you feel safe?',
      optionA: 'Yes I feel safe',
      optionB: 'No, not safe',
    },
    crisis: {
      message: "You're not alone. Pick one:",
      optionA: 'Breathe with me',
      optionB: 'Call for help',
    },
    general: {
      message: 'Just one step. Which one?',
      optionA: 'Breathe',
      optionB: 'Rest',
    },
  },
  OFFLINE: {
    greeting: {
      message: "I'm here even offline. How are you?",
      optionA: "I'm okay",
      optionB: 'Not okay',
    },
    checkin: {
      message: 'No connection needed to check in with yourself.',
      optionA: "I'm grounded",
      optionB: 'I need grounding',
    },
    goal: {
      message: 'Offline mode. Rest or breathe?',
      optionA: 'Rest',
      optionB: 'Breathe',
    },
    crisis: {
      message: 'Emergency? Please call 988 or 911.',
      optionA: 'Call 988',
      optionB: 'Call 911',
    },
    general: {
      message: 'You have what you need inside you.',
      optionA: 'Rest',
      optionB: 'Breathe',
    },
  },
};

export function buildPrompt(state: AppState, context: PromptContext): TwoOptionPrompt {
  return PROMPTS[state]?.[context] ?? PROMPTS[state].general;
}

export function getValidationMessage(): string {
  const msgs = [
    'Whatever you share is welcome here.',
    "There's no wrong answer.",
    "I'm not going anywhere.",
    'You can say as much or as little as you want.',
  ];
  return msgs[Math.floor(Math.random() * msgs.length)];
}
