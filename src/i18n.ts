import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json';
import en from './locales/en.json';
import sw from './locales/sw.json';

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('afrika_lang') || 'fr' : 'fr';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      sw: { translation: sw },
    },
    lng: savedLanguage,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('afrika_lang', lng);
    document.documentElement.lang = lng;
  }
});

export default i18n;
