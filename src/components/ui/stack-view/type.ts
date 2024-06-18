import React from 'react';

import Animated, { type AnimatedProps } from 'react-native-reanimated';

export interface StackViewProps extends AnimatedProps<Animated.ScrollView> {
  children?: React.ReactNode;
}
