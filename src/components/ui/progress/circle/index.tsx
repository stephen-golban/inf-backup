import React from 'react';
import { Text, View } from 'react-native';

import style from './style';
import { useStyle } from '@library/hooks';
import { sharedTiming } from '@library/animated';
import Animated, { Extrapolate, interpolate, useAnimatedProps, useDerivedValue, useSharedValue } from 'react-native-reanimated';

import Svg, { Circle, CircleProps } from 'react-native-svg';

import { COLOR_BG, COLOR_FG, RADIUS, STROKE_WIDTH } from '../constant';

import type { ProgressCircleProps } from './type';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedText = Animated.createAnimatedComponent(Text);

export const ProgressCircle = ({
  round,
  progress,
  textProgressStyle,
  bg = COLOR_BG,
  fg = COLOR_FG,
  radius = RADIUS,
  strokeWidth = STROKE_WIDTH,
  showTextProgress = true,
}: ProgressCircleProps) => {
  const styles = useStyle(style);

  const progressValue = useSharedValue(0);

  const strokeDasharray = React.useMemo(() => `${radius * 2 * Math.PI} ${radius * 2 * Math.PI}`, [radius]);

  const strokeDashoffset = useDerivedValue(() => interpolate(progressValue.value, [0, 100], [Math.PI * 2, 0], Extrapolate.CLAMP) * radius);

  const renderText = () => {
    if (progress < 0) {
      return 0 + '';
    }

    if (progress > 100) {
      return 100 + '';
    }

    return progress + '';
  };

  React.useEffect(() => {
    progressValue.value = sharedTiming(progress);
  }, [progress]);

  const circleProps = useAnimatedProps<CircleProps>(() => ({
    strokeDashoffset: strokeDashoffset.value,
  }));

  return (
    <View style={styles.container}>
      {showTextProgress && <AnimatedText style={[styles.textProgress, textProgressStyle]} children={renderText()} />}
      <View style={[styles.wrapCircle]}>
        <Svg fill={'transparent'} width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
          <AnimatedCircle r={radius} x={radius + strokeWidth / 2} y={radius + strokeWidth / 2} stroke={bg} strokeWidth={strokeWidth} />
          <AnimatedCircle
            strokeLinecap={round ? 'round' : undefined}
            strokeDasharray={strokeDasharray}
            r={radius}
            x={radius + strokeWidth / 2}
            y={radius + strokeWidth / 2}
            stroke={fg}
            strokeWidth={strokeWidth}
            animatedProps={circleProps}
          />
        </Svg>
      </View>
    </View>
  );
};
