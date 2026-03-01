import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import kk from './locales/kk.json';
import ru from './locales/ru.json';
import en from './locales/en.json';

const savedLang = localStorage.getItem('ich-lang') || 'kk';

i18n.use(initReactI18next).init({
  resources: {
    kk: { translation: kk },
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: savedLang,
  fallbackLng: 'kk',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('ich-lang', lng);
  document.documentElement.lang = lng;
});

export default i18n;
