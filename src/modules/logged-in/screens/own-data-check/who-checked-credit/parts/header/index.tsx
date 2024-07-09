import React from 'react';

import { useTranslation } from '@library/hooks';

import { Text } from '@components/common';

import type { I18nKey } from '@translations/locales';

interface HeaderProps {
  count: number;
  days: number;
  companies: number;
}

const Header: React.FC<HeaderProps> = ({ count, days, companies }) => {
  const { t } = useTranslation();
  const getTranslationKey = (value: number, singularKey: I18nKey, pluralKey: I18nKey) => {
    return value === 1 ? singularKey : pluralKey;
  };

  return (
    <Text variant="24-bold">
      {t(
        getTranslationKey(
          count,
          'logged_in:home:own_data_check:who_checked:unique_checks_count_singular',
          'logged_in:home:own_data_check:who_checked:unique_checks_count_plural',
        ),
        {
          count,
        },
      )}{' '}
      {t(
        getTranslationKey(
          days,
          'logged_in:home:own_data_check:who_checked:unique_checks_days_singular',
          'logged_in:home:own_data_check:who_checked:unique_checks_days_plural',
        ),
        {
          days,
        },
      )}{' '}
      {t(
        getTranslationKey(
          companies,
          'logged_in:home:own_data_check:who_checked:unique_checks_companies_singular',
          'logged_in:home:own_data_check:who_checked:unique_checks_companies_plural',
        ),
        {
          companies,
        },
      )}
    </Text>
  );
};

export { Header };
