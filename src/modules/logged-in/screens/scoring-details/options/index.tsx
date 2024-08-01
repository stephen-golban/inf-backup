import React from 'react';
import { useTranslation } from '@library/hooks';

import { Divider } from '@components/ui/divider';
import { Source } from 'react-native-fast-image';
import { Icon, Image, ProgressBar, Text, View } from '@components/common';

import { I18nKey } from '@translations/locales';
import type { Color } from '@theme/colors';

interface IScoringOptionsProps {
  color: Color;
  value: number;
  image: Source;
  title: I18nKey;
  minValue: number;
  maxValue: number;
  hasDivider?: boolean;
}

const ScoringOptions: React.FC<IScoringOptionsProps> = props => {
  const { t } = useTranslation();
  const { image, color, title, value, minValue, maxValue, hasDivider = true } = props;
  return (
    <View py="sm">
      <View row my="md">
        <Image source={image} w={36} h={36} resizeMode="contain" />
        <View>
          <Text color="black" variant="12-mid" t18n={title} />
          <ProgressBar w={150} progress={value || 0} color={color} />
        </View>
        <View ml="xxxl">
          <Text variant="12-reg">{t('logged_in:home:own_data_check:credit_scoring:credit_score')}</Text>
          <View row justify="flex-end">
            <Text color={color}>{minValue}</Text>
            <Icon px="sm" alignSelf="center" icon="ArrowNarrowRight" />
            <Text color={color}>{maxValue}</Text>
          </View>
        </View>
      </View>

      {hasDivider && <Divider isHorizontal />}
    </View>
  );
};

export { ScoringOptions };
