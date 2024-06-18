import React from 'react';

import style from '../style';
import { useTheme } from '@theme/index';
import { useStyle } from '@library/hooks';
import { sharedTiming } from '@library/animated';
import Animated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

import type { ErrorLineProps } from '../type';

const TextInputErrorLine = ({ error, disabled }: ErrorLineProps) => {
  const { colors } = useTheme();
  const styles = useStyle(style);

  const widthPercent = useDerivedValue(() => sharedTiming(error.value && !disabled.value ? 100 : 0, { duration: 200 }), []);

  const lineStyle = useAnimatedStyle(() => {
    return {
      width: `${widthPercent.value}%`,
      backgroundColor: colors.error,
    };
  }, [colors.error]);

  return <Animated.View pointerEvents={'none'} style={[styles.lineStatus, lineStyle]} />;
};

export default TextInputErrorLine;
