import { PHONE_HREF, SITE } from '@/constants/site';
import type { Dictionary, Lang } from '@/i18n';

type AnswerKey = keyof Dictionary['chat']['answers'];
type ActionKey = keyof Dictionary['chat']['actions'];

export interface ChatAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  actions?: ChatAction[];
}

// Set VITE_CHAT_API_URL to switch from the built-in FAQ answers to an AI backend.
// Contract: POST { lang, messages: [{ role, content }] } -> { reply: string }.
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL as string | undefined;

const ACTION_TARGETS: Record<ActionKey, { href: string; external?: boolean }> = {
  programs: { href: '/#programs' },
  join: { href: '/#join' },
  contact: { href: '/contact' },
  gallery: { href: '/gallery' },
  call: { href: PHONE_HREF, external: true },
  directions: { href: SITE.mapsUrl, external: true },
};

interface Intent {
  answer: AnswerKey;
  /** Latin keywords match at the start of a word; Kannada keywords match anywhere. */
  en: string[];
  kn: string[];
  actions?: ActionKey[];
}

// Earlier intents win ties, so specific topics come before broad ones.
const INTENTS: Intent[] = [
  { answer: 'thanks', en: ['thank', 'thx'], kn: ['ಧನ್ಯವಾದ', 'ಥ್ಯಾಂಕ್ಸ್'] },
  {
    answer: 'volunteer',
    en: ['volunteer', 'join', 'sign up', 'get involved', 'help out', 'participate'],
    kn: ['ಸ್ವಯಂಸೇವ', 'ಸೇರ', 'ಕೈಜೋಡಿಸ', 'ಭಾಗವಹಿಸ'],
    actions: ['join'],
  },
  {
    answer: 'donate',
    en: ['donat', 'contribut', 'fund', 'sponsor', 'support you', 'give money'],
    kn: ['ದೇಣಿಗೆ', 'ಕೊಡುಗೆ', 'ಧನಸಹಾಯ'],
    actions: ['call', 'contact'],
  },
  {
    answer: 'hours',
    en: ['hour', 'timing', 'open', 'closed', 'when', 'sunday', 'saturday', 'weekday'],
    kn: ['ಸಮಯ', 'ಯಾವಾಗ', 'ರಜೆ', 'ಭಾನುವಾರ', 'ಶನಿವಾರ'],
  },
  {
    answer: 'location',
    en: [
      'where',
      'address',
      'location',
      'office',
      'direction',
      'map',
      'visit',
      'tumkur',
      'tumakuru',
    ],
    kn: ['ಎಲ್ಲಿ', 'ವಿಳಾಸ', 'ಸ್ಥಳ', 'ಕಚೇರಿ', 'ದಾರಿ', 'ತುಮಕೂರು'],
    actions: ['directions'],
  },
  {
    answer: 'contact',
    en: ['contact', 'phone', 'call', 'email', 'mail', 'number', 'reach', 'whatsapp'],
    kn: ['ಸಂಪರ್ಕ', 'ಫೋನ್', 'ದೂರವಾಣಿ', 'ಇಮೇಲ್', 'ಕರೆ', 'ನಂಬರ್'],
    actions: ['call', 'contact'],
  },
  {
    answer: 'women',
    en: ['women', 'woman', 'shg', 'self help', 'self-help', 'loan', 'saving', 'empower'],
    kn: ['ಮಹಿಳ', 'ಸ್ವಸಹಾಯ', 'ಸಾಲ', 'ಉಳಿತಾಯ', 'ಸಬಲೀಕರಣ'],
    actions: ['programs'],
  },
  {
    answer: 'water',
    en: ['water', 'sanitation', 'hygiene', 'toilet', 'unicef', 'drinking', 'sewage'],
    kn: ['ನೀರು', 'ನೀರಿನ', 'ನೈರ್ಮಲ್ಯ', 'ಸ್ವಚ್ಛ', 'ಶೌಚ', 'ಯುನಿಸೆಫ್'],
    actions: ['programs'],
  },
  {
    answer: 'education',
    en: ['educat', 'school', 'child', 'scholarship', 'study', 'student', 'tutor'],
    kn: ['ಶಿಕ್ಷಣ', 'ಶಾಲೆ', 'ಮಕ್ಕಳ', 'ವಿದ್ಯಾರ್ಥಿ', 'ಓದು'],
    actions: ['programs'],
  },
  {
    answer: 'health',
    en: ['health', 'clinic', 'medical', 'doctor', 'hospital', 'nutrition', 'medicine'],
    kn: ['ಆರೋಗ್ಯ', 'ಚಿಕಿತ್ಸ', 'ವೈದ್ಯ', 'ಪೌಷ್ಟಿಕ', 'ಆಸ್ಪತ್ರೆ'],
    actions: ['programs'],
  },
  {
    answer: 'environment',
    en: ['environment', 'farm', 'agricultur', 'tree', 'climate', 'forest', 'machiner', 'plant'],
    kn: ['ಪರಿಸರ', 'ಕೃಷಿ', 'ರೈತ', 'ಮರಗ', 'ಗಿಡ', 'ಅರಣ್ಯ', 'ಹವಾಮಾನ', 'ಯಂತ್ರ'],
    actions: ['programs'],
  },
  {
    answer: 'team',
    en: ['team', 'founder', 'secretary', 'who runs', 'staff', 'member', 'achyuth', 'people'],
    kn: ['ತಂಡ', 'ಕಾರ್ಯದರ್ಶಿ', 'ಸಂಸ್ಥಾಪಕ', 'ಸಿಬ್ಬಂದಿ'],
  },
  {
    answer: 'gallery',
    en: ['photo', 'picture', 'gallery', 'image', 'video'],
    kn: ['ಫೋಟೋ', 'ಚಿತ್ರ', 'ಗ್ಯಾಲರಿ'],
    actions: ['gallery'],
  },
  {
    answer: 'programs',
    en: ['program', 'project', 'initiative', 'what do you do', 'work', 'activit', 'service'],
    kn: ['ಕಾರ್ಯಕ್ರಮ', 'ಯೋಜನೆ', 'ಕೆಲಸ', 'ಚಟುವಟಿಕೆ', 'ಸೇವೆ'],
    actions: ['programs'],
  },
  {
    answer: 'about',
    en: [
      'about',
      'who are you',
      'navayuga',
      'ngo',
      'organi',
      'history',
      'registered',
      'mission',
      'vision',
    ],
    kn: ['ನವಯುಗ', 'ಸಂಸ್ಥೆ', 'ಬಗ್ಗೆ', 'ಧ್ಯೇಯ', 'ಉದ್ದೇಶ'],
  },
];

const GREETING = /^\s*(hi|hello|hey|hii+|namaste|namaskara|good (morning|afternoon|evening))\b/i;
const KN_GREETING = /^\s*(ನಮಸ್ಕಾರ|ನಮಸ್ತೆ|ಹಾಯ್|ಹಲೋ)/;

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function score(intent: Intent, text: string) {
  const en = intent.en.filter((kw) => new RegExp(`\\b${escapeRegExp(kw)}`, 'i').test(text)).length;
  const kn = intent.kn.filter((kw) => text.includes(kw)).length;
  return en + kn;
}

function faqReply(question: string, t: Dictionary): ChatMessage {
  const toActions = (keys: ActionKey[] = []) =>
    keys.map((key) => ({ label: t.chat.actions[key], ...ACTION_TARGETS[key] }));

  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    const s = score(intent, question);
    if (s > bestScore) {
      best = intent;
      bestScore = s;
    }
  }

  if (!best && (GREETING.test(question) || KN_GREETING.test(question))) {
    return { role: 'assistant', content: t.chat.answers.greeting };
  }
  if (!best) {
    return {
      role: 'assistant',
      content: t.chat.answers.fallback,
      actions: toActions(['call', 'contact']),
    };
  }
  return {
    role: 'assistant',
    content: t.chat.answers[best.answer],
    actions: toActions(best.actions),
  };
}

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export async function getReply(
  history: ChatMessage[],
  lang: Lang,
  t: Dictionary,
): Promise<ChatMessage> {
  if (CHAT_API_URL) {
    const res = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lang,
        messages: history.map(({ role, content }) => ({ role, content })),
      }),
    });
    if (!res.ok) throw new Error(`Chat API responded ${res.status}`);
    const data = (await res.json()) as { reply?: unknown };
    if (typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('Empty reply');
    return { role: 'assistant', content: data.reply };
  }

  const question = history[history.length - 1]?.content ?? '';
  await wait(450 + Math.min(question.length * 12, 500));
  return faqReply(question, t);
}
