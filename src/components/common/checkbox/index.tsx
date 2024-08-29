import React from 'react';

import { useTheme } from '@theme/index';
import { execFunc, isTypeof } from '@library/method';
import { useSharedTransition } from '@library/animated';
import { useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

import { Icon } from '../icon';
import { AnimatedView } from '../view';
import { BaseButton } from '../button';

import type { CheckboxProps } from './type';

const Checkbox: React.FC<CheckboxProps> = props => {
  const { children, value = false, reverse = false, onToggle, size = 24, checkIconSize = 16, disabled = false } = props;

  const { colors } = useTheme();
  const [localValue, setLocalValue] = React.useState(value);

  const progress = useSharedTransition(isTypeof(value, 'boolean') ? value : localValue, { duration: 200 });

  React.useEffect(() => {
    if (isTypeof(value, 'boolean')) {
      setLocalValue(value);
    }
  }, [value]);

  const onPress = () => {
    const newValue = typeof value === 'boolean' ? !value : !localValue;
    execFunc(onToggle, newValue);
    if (typeof value !== 'boolean') {
      setLocalValue(newValue);
    }
  };

  const containerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], [colors.mediumGray, colors.blue]);
    const borderColor = interpolateColor(progress.value, [0, 1], [colors.lightGray, colors.blue]);

    return {
      borderColor: withTiming(borderColor, { duration: 50 }),
      backgroundColor: withTiming(backgroundColor, { duration: 50 }),
    };
  });

  return (
    <BaseButton disabled={disabled} onPress={onPress} direction={reverse ? 'row-reverse' : 'row'} align="center">
      <AnimatedView style={[containerStyle]} center w={size} h={size} br="xs" bw={1}>
        {localValue && <Icon size={checkIconSize} icon="CheckIcon" color="white" strokeWidth={3} />}
      </AnimatedView>
      {children}
    </BaseButton>
  );
};

export { Checkbox, type CheckboxProps };
