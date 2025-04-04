import { initReactI18next } from 'react-i18next';

import i18n, { LanguageDetectorAsyncModule, Resource } from 'i18next';

import { resources } from './locales';

import Config from 'react-native-config';
const { DEFAULT_FALLBACK_LNG_I18n } = Config;

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (lng: string | readonly string[] | undefined) => void) => {
    callback(DEFAULT_FALLBACK_LNG_I18n);
  },
  init: () => {
    console.log('init I18n');
  },
  cacheUserLanguage: () => {},
};

export const initOptionsI18n = (source: Resource) => {
  return {
    fallbackLng: DEFAULT_FALLBACK_LNG_I18n,

    resources: source,

    defaultNS: 'ui',
    ns: ['logged-out', 'ui', 'validation'],
    debug: false,

    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3' as any,
  };
};

i18n.use(languageDetector).use(initReactI18next).init(initOptionsI18n(resources));

export default i18n;
