import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { welcome: "How can I assist you today?" } },
    es: { translation: { welcome: "¿Cómo puedo ayudarte hoy?" } },
    fr: { translation: { welcome: "Comment puis-je vous aider aujourd'hui?" } },
    de: { translation: { welcome: "Wie kann ich Ihnen heute helfen?" } }
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
