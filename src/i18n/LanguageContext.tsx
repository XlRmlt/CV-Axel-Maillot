import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations, Lang } from './translation';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<Ctx | undefined>(undefined);

const detectInitial = (): Lang => {
  const saved = localStorage.getItem('lang') as Lang | null;
  if (saved) return saved;
  const nav = navigator.language?.slice(0, 2).toLowerCase();
  if (nav === 'fr') return 'fr';
  if (nav === 'es') return 'es';
  return 'en';
};

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(detectInitial);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => {
    const dict = translations[lang] ?? translations.en;
    return (key: string) => {
      // Support nested keys: "about.aboutTitle"
      const value = key.split('.').reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), dict);
      return typeof value === 'string' ? value : key;
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
