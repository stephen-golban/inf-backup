import React from 'react';

import { Trans } from 'react-i18next';
import { Text } from '@components/common';

import type { I18nKey } from '@translations/locales';

interface ITextRow {
  title: I18nKey;
  onPress(): void;
}

const TextRow: React.FC<ITextRow> = ({ title, onPress }) => {
  return (
    <Text variant="16-reg" textAlign="center">
      <Trans i18nKey={title} components={{ 1: <Text variant="16-mid" color="blue" textDecorationLine="underline" onPress={onPress} /> }} />
    </Text>
  );
};

export { TextRow };
