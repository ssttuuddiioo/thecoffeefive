'use client';

import { createContext, useContext } from 'react';
import type { Locale } from '@/config/i18n';
import type { Dictionary } from '@/config/dictionaries';

type LanguageContextValue = {
  locale: Locale;
  /** The active dictionary. */
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <LanguageContext.Provider value={{ locale, t: dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Access the active locale + dictionary. Must be used under <LanguageProvider>. */
export function useTranslation(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return ctx;
}
