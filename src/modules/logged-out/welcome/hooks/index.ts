import { useEffect } from 'react';
import { setAppLocale, useAppStore } from '@store/app';

import type { IAppState } from '@typings/app';
import { NativeModules, Platform } from 'react-native';

const LANGUAGES = {
  en: '🇺🇸   English',
  ro: '🇲🇩   Română',
  ru: '🇷🇺   Русский',
};

type Locale = IAppState['locale'];

function useWelcomeModule() {
  const locale = useAppStore(state => state.locale);

  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  useEffect(() => {
    if (!locale) {
      const languageCode = deviceLanguage.split('_')[0];
      if (LANGUAGES[languageCode as Locale]) {
        setAppLocale(languageCode as Locale);
      }
    }
  }, [deviceLanguage, locale]);

  const onChange = (value: { label: string; value: string }) => {
    const selectedLanguageCode = Object.keys(LANGUAGES).find(key => {
      return LANGUAGES[key as Locale] === value.value;
    }) as Locale | undefined;

    if (selectedLanguageCode) {
      return setAppLocale(selectedLanguageCode);
    }
  };

  const selectedLanguage = LANGUAGES[locale];

  const options = Object.values(LANGUAGES).map(value => {
    return { label: value, value };
  });

  const defaultValue = { label: selectedLanguage, value: selectedLanguage };

  return {
    options,
    onChange,
    defaultValue,
  };
}
export default useWelcomeModule;
