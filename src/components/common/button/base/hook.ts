import { useEventCallback } from '@library/hooks';
import { execFunc, isTypeof } from '@library/method';
import { GestureResponderEvent, PressableProps } from 'react-native';

import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

export type UseThrottleParam = {
  throttleMs?: number;
  onPress?: PressableProps['onPress'];
  onLongPress?: PressableProps['onLongPress'];
  onPressIn?: PressableProps['onPressIn'];
  onPressOut?: PressableProps['onPressOut'];
};

export const useThrottle = ({ throttleMs = 200, onPress, onPressIn, onPressOut, onLongPress }: UseThrottleParam) => {
  const progressToEnable = useSharedValue(0);

  const handlePress = useEventCallback((e: GestureResponderEvent) => {
    if (isTypeof(onPress, 'function')) {
      if (progressToEnable.value > 0) {
        return;
      }

      if (isTypeof(throttleMs, 'number')) {
        progressToEnable.value = 1;

        progressToEnable.value = withTiming(0, {
          duration: throttleMs,
          easing: Easing.linear,
        });
      }

      execFunc(onPress, e);
    }
  });

  const handleLongPress = useEventCallback((e: GestureResponderEvent) => {
    if (isTypeof(onLongPress, 'function')) {
      if (progressToEnable.value > 0) {
        return;
      }

      if (isTypeof(throttleMs, 'number')) {
        progressToEnable.value = 1;

        progressToEnable.value = withTiming(0, {
          duration: throttleMs,
          easing: Easing.linear,
        });
      }

      execFunc(onLongPress, e);
    }
  });

  const handlePressIn = useEventCallback((e: GestureResponderEvent) => {
    if (progressToEnable.value > 0) {
      return;
    }

    execFunc(onPressIn, e);
  });

  const handlePressOut = useEventCallback((e: GestureResponderEvent) => {
    if (progressToEnable.value > 0) {
      return;
    }

    execFunc(onPressOut, e);
  });

  return [progressToEnable, handlePress, handleLongPress, handlePressIn, handlePressOut] as const;
};
