import React from 'react';

import { useTranslation } from '@library/hooks';

import { Icon, Text, View } from '@components/common';

import { I18nKey } from '@translations/locales';
import { creditScoringTexts } from '@components/ui/scoring/helpers';

interface IScoringTextProps {
  score: number;
}

const ScoringText: React.FC<IScoringTextProps> = props => {
  const { score } = props;

  const { t } = useTranslation();

  const getScoringText = (score: number): string | null => {
    for (const { max, key } of creditScoringTexts) {
      if (score <= max) {
        return t(`logged_in:credit_report:scoring:${key}` as I18nKey);
      }
    }

    return null;
  };

  const message = getScoringText(score);

  if (!message) return null;

  return (
    <View row center>
      <Text mt="sm" textAlign="center">
        {message}
      </Text>
      <Icon icon="InfoIcon" />
    </View>
  );
};

export { ScoringText };
