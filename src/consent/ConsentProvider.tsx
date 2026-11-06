import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { ConsentContext, type ConsentChoice } from './context';

const STORAGE_KEY = 'navayuga-consent';

function readChoice(): ConsentChoice {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'all' || saved === 'necessary') return saved;
  } catch {
    // Storage unavailable: ask again on each visit.
  }
  return null;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<ConsentChoice>(readChoice);
  const [reopened, setReopened] = useState(false);

  const setChoice = useCallback((next: Exclude<ConsentChoice, null>) => {
    setChoiceState(next);
    setReopened(false);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Choice holds for this session only.
    }
  }, []);

  const openBanner = useCallback(() => setReopened(true), []);

  const value = useMemo(
    () => ({ choice, setChoice, bannerOpen: choice === null || reopened, openBanner }),
    [choice, setChoice, reopened, openBanner],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}
