
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Language } from '../types';
import { translations } from '../constants';

type TranslationKey = keyof typeof translations.pl;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, ...args: any[]) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('nl');

  const t = (key: TranslationKey, ...args: any[]): string => {
    const translationSet = translations[language] || translations.pl;
    const value = translationSet[key] || key;
    // Simple interpolation if needed, e.g., t('greeting', 'John') -> 'Hello, John!'
    if (args.length > 0) {
      return value.replace(/{(\d+)}/g, (match, number) => 
        typeof args[number] !== 'undefined'
          ? args[number]
          : match
      );
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};