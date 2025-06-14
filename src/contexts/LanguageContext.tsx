
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>('pt');
  const [translations, setTranslations] = useState<Record<string, string>>({});

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['pt', 'en', 'es'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../locales/${language}`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to Portuguese if error
        const fallbackModule = await import('../locales/pt');
        setTranslations(fallbackModule.default);
      }
    };

    loadTranslations();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
