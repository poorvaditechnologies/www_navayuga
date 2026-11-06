import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { en } from './en';
import { kn } from './kn';
import { LanguageContext, type Lang } from './context';

const STORAGE_KEY = 'navayuga-lang';
const DICTIONARIES = { en, kn };

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'kn') return saved;
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
  }
  return navigator.language?.toLowerCase().startsWith('kn') ? 'kn' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = DICTIONARIES[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Preference simply won't persist.
    }
  }, [lang, t]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
