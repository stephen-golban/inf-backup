import React from 'react';

import { Image, Text, View } from '@components/common';
import { type ImageSourcePropType } from 'react-native';

interface IEmptyState {
  title?: string;
  imageSource?: ImageSourcePropType;
}

const EmptyState: React.FC<IEmptyState> = ({ title, imageSource = require('@assets/images/empty.png') }) => {
  return (
    <View align="center" rg="md">
      <View w={200} h={150}>
        <Image source={imageSource} />
      </View>
      {title ? (
        <Text variant="20-bold" text={title} textAlign="center" />
      ) : (
        <Text variant="20-bold" t18n="ui:empty_state" textAlign="center" />
      )}
    </View>
  );
};

export { EmptyState };
