import React from 'react';
import { StyleSheet } from 'react-native';

import { ActivityIndicator, View, ViewProps } from '@components/common';

import type { Color } from '@theme/colors';

interface ILoader extends ViewProps {
  color?: Color;
  loading?: boolean;
}

const Loader: React.FC<ILoader> = ({ color = 'blue', children, loading, ...props }) => {
  return (
    <View style={StyleSheet.absoluteFillObject} center zIndex="huge" {...props}>
      {loading ? <ActivityIndicator color={color} /> : <>{loading ? children : <ActivityIndicator color={color} />}</>}
    </View>
  );
};

export { Loader };
