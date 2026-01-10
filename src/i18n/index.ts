import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import nb from './locales/nb.json';
import mk from './locales/mk.json';

const LANGUAGE_KEY = 'visual-routines-language';

// Get saved language or default to English
const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    nb: { translation: nb },
    mk: { translation: mk },
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

// Save language preference when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LANGUAGE_KEY, lng);
});

export default i18n;
