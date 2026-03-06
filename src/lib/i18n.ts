import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fr from '../../public/locales/fr/fr.common.json';
import en from '../../public/locales/en/en.common.json';
import ar from '../../public/locales/ar/ar.common.json';
import es from '../../public/locales/es/es.common.json';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      fr: { common: fr },
      en: { common: en },
      ar: { common: ar },
      es: { common: es },
    },
    lng: 'fr',
    fallbackLng: 'fr',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });
}

export default i18n;