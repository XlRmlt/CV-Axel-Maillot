export type Lang = 'fr' | 'en' | 'es';

export const translations: Record<Lang, Record<string, string>> = {
  fr: {
    followMe: 'ABONNEZ-VOUS',
    changeLanguage: 'Changer la langue',
  },
  en: {
    followMe: 'FOLLOW ME',
    changeLanguage: 'Change language',
  },
  es: {
    followMe: 'SÍGUEME',
    changeLanguage: 'Cambiar el idioma',
  },
};