import i18n from '@translations/i18n';
import { setAppLocale, useAppStore } from '@store/app';

import type { IAppState } from '@typings/app';

const LANGUAGES = {
  en: '🇺🇸   English',
  ro: '🇲🇩   Română',
  ru: '🇷🇺   Русский',
};

type Locale = IAppState['locale'];

function useWelcomeModule() {
  const locale = useAppStore(state => state.locale);

  const handleChangeLanguage = (value: string) => {
    const selectedLanguageCode = Object.keys(LANGUAGES).find(key => {
      return LANGUAGES[key as Locale] === value;
    }) as Locale | undefined;

    if (selectedLanguageCode) {
      setAppLocale(selectedLanguageCode);
      return i18n.changeLanguage(selectedLanguageCode);
    }
  };

  const selectedLanguage = LANGUAGES[i18n.language as Locale] || locale;

  const languages = Object.values(LANGUAGES);

  return {
    languages,
    selectedLanguage,
    handleChangeLanguage,
  };
}
export default useWelcomeModule;
