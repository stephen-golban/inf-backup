import React from 'react';

import { Controller, type Control } from 'react-hook-form';

import { Dropdown, Text, View } from '@components/common';

import type { Locale } from '@typings/app';
import type { CreditReportOrderFormFields } from '../../resolver';

interface ILanguageSelect {
  control: Control<CreditReportOrderFormFields>;
}

const LANGUAGES = {
  en: '🇺🇸   English',
  ro: '🇲🇩   Română',
  ru: '🇷🇺   Русский',
};

const LanguageSelect: React.FC<ILanguageSelect> = ({ control }) => {
  const onChange = (value: { label: string; value: string }, onSelectLanguage: (...event: any[]) => void) => {
    const selectedLanguageCode = Object.keys(LANGUAGES).find(key => {
      return LANGUAGES[key as Locale] === value.value;
    }) as Locale | undefined;

    if (selectedLanguageCode) {
      return onSelectLanguage(selectedLanguageCode);
    }
  };

  const options = Object.values(LANGUAGES).map(value => {
    return { label: value, value };
  });

  return (
    <View mt="lg">
      <Text ml="sm" variant="16-semi" t18n="logged_in:payment:credit_report_order:select_language" />
      <View mt="sm">
        <Controller
          control={control}
          name="language"
          render={({ field }) => {
            const value = field.value as Locale;
            const selectedLanguage = LANGUAGES[value];
            const defaultValue = { label: selectedLanguage, value: selectedLanguage };
            return <Dropdown data={options} defaultValue={defaultValue} onChange={val => onChange(val, field.onChange)} bg="softGray" />;
          }}
        />
      </View>
    </View>
  );
};

export { LanguageSelect };
