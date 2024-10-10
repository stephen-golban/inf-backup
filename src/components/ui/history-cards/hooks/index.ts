import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming, withRepeat, interpolate, Easing } from 'react-native-reanimated';

export const useShimmerAnimation = () => {
  const shimmerValue = useSharedValue(0);

  useEffect(() => {
    shimmerValue.value = withRepeat(withTiming(1, { duration: 2000, easing: Easing.linear }), -1, false);
  }, [shimmerValue]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(shimmerValue.value, [0, 1], [-100, 300]);
    return {
      transform: [{ translateX }],
    };
  });

  return animatedStyle;
};
