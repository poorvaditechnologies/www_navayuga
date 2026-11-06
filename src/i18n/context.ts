import { createContext, useContext } from 'react';
import { en, type Dictionary } from './en';

export type Lang = 'en' | 'kn';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: en,
});

export const useLanguage = () => useContext(LanguageContext);
export const useT = () => useContext(LanguageContext).t;
