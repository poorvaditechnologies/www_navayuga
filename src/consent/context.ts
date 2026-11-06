import { createContext, useContext } from 'react';

/** null = not decided yet; 'all' = optional third-party embeds allowed; 'necessary' = essentials only. */
export type ConsentChoice = 'all' | 'necessary' | null;

interface ConsentContextValue {
  choice: ConsentChoice;
  setChoice: (choice: Exclude<ConsentChoice, null>) => void;
  bannerOpen: boolean;
  openBanner: () => void;
}

export const ConsentContext = createContext<ConsentContextValue>({
  choice: null,
  setChoice: () => {},
  bannerOpen: false,
  openBanner: () => {},
});

export const useConsent = () => useContext(ConsentContext);
