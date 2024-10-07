import React from 'react';

import style from './style';
import { useStyle } from '@library/hooks';

import { View } from '../view';
import { Text } from '../text';
import { BaseButton } from '../button';
import * as RadioGroupPrimitive from '@rn-primitives/radio-group';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  defaultValue?: string;
  horizontal?: boolean;
  options: RadioOption[];
  onValueChange?: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, defaultValue, horizontal = true, onValueChange }) => {
  const styles = useStyle(style);
  const [value, setValue] = React.useState(defaultValue || options[0]?.value);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  function onLabelPress(val: string) {
    return () => {
      handleValueChange(val);
    };
  }

  return (
    <RadioGroupPrimitive.Root value={value as any} onValueChange={handleValueChange}>
      <View row={horizontal} g="md">
        {options.map((option, idx) => (
          <BaseButton key={option.value + idx} row align="center" onPress={onLabelPress(option.value)}>
            <RadioGroupPrimitive.Item style={styles.container} value={option.value as any} aria-labelledby={`label-${option.value}`}>
              <RadioGroupPrimitive.Indicator style={styles.radioIndicator} />
            </RadioGroupPrimitive.Item>
            <Text nativeID={`label-${option.value}`} disabled ml="sm" variant="14-reg" color="black">
              {option.label}
            </Text>
          </BaseButton>
        ))}
      </View>
    </RadioGroupPrimitive.Root>
  );
};

export { RadioGroup };
