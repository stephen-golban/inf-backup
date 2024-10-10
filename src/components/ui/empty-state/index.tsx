import React from 'react';

import { Image, Text, View } from '@components/common';

import type { I18nKey } from '@translations/locales';
import { type ImageSourcePropType } from 'react-native';

interface IEmptyState {
  t18n?: I18nKey;
  title?: string;
  imageSource?: ImageSourcePropType;
}

const EmptyState: React.FC<IEmptyState> = ({ title, t18n, imageSource = require('@assets/images/empty.png') }) => {
  return (
    <View align="center" rg="md">
      <View w={200} h={150}>
        <Image source={imageSource} />
      </View>
      {title || t18n ? (
        <Text variant="20-bold" t18n={t18n} text={title} textAlign="center" />
      ) : (
        <Text variant="20-bold" t18n="ui:empty_state" textAlign="center" />
      )}
    </View>
  );
};

export { EmptyState };
