import React from 'react';
import { StyleSheet } from 'react-native';

import { ActivityIndicator, View, ViewProps } from '@components/common';

import type { Color } from '@theme/colors';

interface ILoader extends ViewProps {
  color?: Color
}

const Loader: React.FC<ILoader> = ({ color = 'blue', ...props }) => {
  return (
    <View style={StyleSheet.absoluteFillObject} center zIndex="huge" {...props}>
      <ActivityIndicator color={color} />
    </View>
  );
};

export { Loader };
