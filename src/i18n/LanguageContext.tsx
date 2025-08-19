import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "fr" | "en" | "es";

type LanguageContextType = {
  lang: Language;
  setLang: (l: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "site-lang";

function detectInitial(): Language {
  // 1) localStorage si présent
  const saved = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as Language | null;
  if (saved === "fr" || saved === "en" || saved === "es") return saved;

  // 2) navigateur → défaut: fr
  const nav = typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "fr";
  if (nav.startsWith("en")) return "en";
  if (nav.startsWith("es")) return "es";
  return "fr";
}

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(detectInitial());

  const setLang = (l: Language) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
    // Optionnel : attribut lang sur <html> pour l’accessibilité
    try { document.documentElement.setAttribute("lang", l === "fr" ? "fr" : l === "en" ? "en" : "es"); } catch {}
  };

  useEffect(() => {
    // s’assure que l’attribut est initialisé au premier rendu
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}