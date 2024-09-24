import * as React from 'react';
import { StyleSheet } from 'react-native';

import { createStyled } from '@library/restyle';

import { AnimatedView } from '../view';
import * as SwitchPrimitives from '@rn-primitives/switch';
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

import COLORS from '@theme/colors';

const RGB_COLORS = {
  primary: COLORS.blue,
  input: 'rgb(228, 228, 231)',
} as const;

const SwitchNative = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & { sizeW?: number; sizeH?: number; thumbSize?: number }
>(({ style, sizeW = 50, sizeH = 32, thumbSize = sizeH / 1.5, ...props }, ref) => {
  const translateX = useDerivedValue(() => (props.checked ? sizeW - thumbSize - 4 : 2.5));
  const animatedRootStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(translateX.value, [2.5, sizeW - thumbSize - 4], [RGB_COLORS.input, RGB_COLORS.primary]),
    };
  });
  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(translateX.value, { duration: 200 }) }],
    backgroundColor: interpolateColor(translateX.value, [2.5, sizeW - thumbSize - 4], [COLORS.blue, COLORS.white]),
  }));
  return (
    <AnimatedView
      h={sizeH}
      w={sizeW}
      br={9999}
      bc="transparent"
      row
      align="center"
      opacity={props.disabled ? 0.5 : 1}
      style={[animatedRootStyle, style as any]}>
      <SwitchPrimitives.Root
        style={[{ height: sizeH, width: sizeW }, styles.switchNativeRoot, props.checked ? styles.bgPrimary : styles.bgInput]}
        {...props}
        ref={ref}>
        <Animated.View style={[{ borderRadius: 9999 }, animatedThumbStyle]}>
          <SwitchPrimitives.Thumb style={[styles.switchNativeThumb, { width: thumbSize, height: thumbSize }]} />
        </Animated.View>
      </SwitchPrimitives.Root>
    </AnimatedView>
  );
});
SwitchNative.displayName = 'SwitchNative';

const styles = StyleSheet.create({
  translateX5: {
    transform: [{ translateX: 20 }],
  },
  translateX0: {
    transform: [{ translateX: 0 }],
  },
  bgPrimary: {
    backgroundColor: COLORS.blue,
  },
  bgInput: {
    backgroundColor: 'rgb(228, 228, 231)',
  },
  opacity50: {
    opacity: 0.5,
  },
  switchNativeRoot: {
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: COLORS.blue,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchNativeThumb: {
    borderRadius: 9999,
  },
});

const Switch = createStyled(SwitchNative);

export { Switch };
