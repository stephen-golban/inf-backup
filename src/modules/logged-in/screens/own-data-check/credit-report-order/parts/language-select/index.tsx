import React from 'react';

import { Dropdown } from '@components/common';

import type { Locale } from '@typings/app';

interface ILanguageSelect {
  value: Locale;
  onSelectLanguage(arg: Locale): void;
}

const LANGUAGES = {
  en: '🇺🇸   English',
  ro: '🇲🇩   Română',
  ru: '🇷🇺   Русский',
};

const LanguageSelect: React.FC<ILanguageSelect> = ({ value, onSelectLanguage }) => {
  const onChange = (value: { label: string; value: string }) => {
    const selectedLanguageCode = Object.keys(LANGUAGES).find(key => {
      return LANGUAGES[key as Locale] === value.value;
    }) as Locale | undefined;

    if (selectedLanguageCode) {
      return onSelectLanguage(selectedLanguageCode);
    }
  };

  const selectedLanguage = LANGUAGES[value];

  const options = Object.values(LANGUAGES).map(value => {
    return { label: value, value };
  });

  const defaultValue = { label: selectedLanguage, value: selectedLanguage };

  return <Dropdown data={options} defaultValue={defaultValue} onChange={onChange} bg="softGray" />;
};

export { LanguageSelect };
