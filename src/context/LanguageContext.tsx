import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getLanguage, setLanguage } from '../lib/i18n';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: 'fr' | 'en') => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'fr',
  setLanguage: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setCurrentLanguage] = useState(getLanguage());

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setCurrentLanguage(customEvent.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const changeLanguage = (lang: 'fr' | 'en') => {
    setLanguage(lang);
  };

  const value = {
    language,
    setLanguage: changeLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}