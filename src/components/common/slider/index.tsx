import React from 'react';

import { useTheme } from '@theme/index';

import { View } from '../view';
import { Slider as NativeSlider } from '@miblanchard/react-native-slider';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

const Slider: React.FC<SliderProps> = ({ value, step = 1000, onValueChange, disabled = false, min = 5000, max = 60000 }) => {
  const { colors } = useTheme();

  return (
    <View fill align="stretch">
      <NativeSlider
        step={step}
        value={[value]}
        minimumValue={min}
        maximumValue={max}
        animateTransitions
        disabled={disabled}
        onValueChange={v => onValueChange(v[0])}
        thumbStyle={{ backgroundColor: colors.skyBlue }}
        minimumTrackStyle={{ backgroundColor: colors.skyBlue }}
        trackStyle={{ backgroundColor: colors.black, height: 4 }}
      />
    </View>
  );
};

export { Slider };
