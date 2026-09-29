import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { readConsent, writeConsent, type ConsentAction, type ConsentChoices, type ConsentState } from "./consentStorage";

interface ConsentContextValue {
  consent: ConsentState | null;
  /** true si el usuario aún no ha decidido (hay que mostrar el banner) */
  pending: boolean;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (choices: ConsentChoices) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export const ConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsent] = useState<ConsentState | null>(() => readConsent());
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const decide = useCallback((choices: ConsentChoices, action: ConsentAction) => {
    setConsent(writeConsent(choices, action));
    setPreferencesOpen(false);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      pending: consent === null,
      preferencesOpen,
      acceptAll: () => decide({ analytics: true }, "accept_all"),
      rejectAll: () => decide({ analytics: false }, "reject_all"),
      save: (choices) => decide(choices, "custom"),
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
    }),
    [consent, preferencesOpen, decide],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useConsent = (): ConsentContextValue => {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useConsent debe usarse dentro de <ConsentProvider>");
  return context;
};
