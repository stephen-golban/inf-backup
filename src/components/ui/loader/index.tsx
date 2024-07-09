import React from 'react';
import { StyleSheet } from 'react-native';

import { ActivityIndicator, View, ViewProps } from '@components/common';

const Loader: React.FC<ViewProps> = props => {
  return (
    <View style={StyleSheet.absoluteFillObject} center zIndex="huge" {...props}>
      <ActivityIndicator color="blue" />
    </View>
  );
};

export { Loader };
