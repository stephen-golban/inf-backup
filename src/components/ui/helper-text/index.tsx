import React, { useEffect, useMemo, useState } from 'react';

import { useTheme } from '@theme/index';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { sharedTiming, useInterpolate, useSharedTransition } from '@library/animated';

import { Text, View } from '@components/common';

import type { HelperTextProps } from './type';
import { type LayoutChangeEvent, type LayoutRectangle, type StyleProp, type ViewStyle } from 'react-native';

const HelperText: React.FC<HelperTextProps> = ({ msg, type, colorInfo = 'gold', colorError = 'error', visible = false }) => {
  const theme = useTheme();

  const [currentMessage, setCurrentMessage] = useState<string>(msg ?? '');

  const [measured, setMeasured] = useState<LayoutRectangle>({ height: 0, width: 0, x: 0, y: 0 });

  const height = useSharedValue(0);

  const progress = useSharedTransition(visible);

  const opacity = useInterpolate(progress, [0, 1], [0, 1]);

  const _onLayoutContent = (e: LayoutChangeEvent) => {
    setMeasured({ ...e.nativeEvent.layout });
  };

  const textStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      { height: measured.height },
      type === 'error'
        ? {
            color: theme.colors[colorError],
          }
        : {
            color: theme.colors[colorInfo],
          },
    ],
    [measured.height, theme.colors, type],
  );

  // effect
  useEffect(() => {
    if (msg) {
      setCurrentMessage(msg);
    }
  }, [msg]);

  useEffect(() => {
    if (visible) {
      height.value = sharedTiming(measured.height);
    } else {
      height.value = sharedTiming(0);
    }
  }, [measured.height, visible]);

  const style = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
  }));

  return (
    <View pt={3} pb="xs" justify="center" align="flex-start" w="100%" overflow="hidden">
      <Animated.View pointerEvents={'none'} onLayout={_onLayoutContent} style={{ position: 'absolute', zIndex: -999, opacity: 0 }}>
        <Text>{currentMessage}</Text>
      </Animated.View>
      <Animated.View style={[style]}>
        <Text style={textStyle}>{currentMessage}</Text>
      </Animated.View>
    </View>
  );
};

export { HelperText };
