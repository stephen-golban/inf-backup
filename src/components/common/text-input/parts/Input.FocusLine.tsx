import React from 'react';

import style from '../style';
import { useTheme } from '@theme/index';
import { useStyle } from '@library/hooks';
import { sharedTiming } from '@library/animated';
import Animated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

import type { FocusedLineProps } from '../type';

const TextInputFocusLine = ({ focused, disabled }: FocusedLineProps) => {
  const { colors } = useTheme();
  const styles = useStyle(style);

  const widthPercent = useDerivedValue(() => {
    return sharedTiming(focused.value && !disabled.value ? 100 : 0, {
      duration: 200,
    });
  }, []);

  const lineStyle = useAnimatedStyle(() => {
    return {
      width: `${widthPercent.value}%`,
      backgroundColor: colors.primary,
    };
  }, []);

  return <Animated.View pointerEvents={'none'} style={[styles.lineStatus, lineStyle]} />;
};

export default TextInputFocusLine;
