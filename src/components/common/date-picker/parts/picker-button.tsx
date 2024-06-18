import React from 'react';

import TimePickerIcon from './picker-icon';
import { Text } from '@components/common/text';
import { View } from '@components/common/view';
import { Button } from '@components/common/button';

import type { IPicker } from '../types';

interface IPickerButton extends Pick<IPicker, 'Icon' | 'disabled' | 'label' | 'placeholder' | 'isColumnAppearance'> {
  text?: string;
  onPress(): void;
  children: React.ReactNode;
}

const PickerButton: React.FC<IPickerButton> = props => {
  const { children, text, onPress, Icon, disabled, label, placeholder, isColumnAppearance } = props;

  const flex = isColumnAppearance ? {} : { flex: 1 };
  return (
    <View mt={label ? 'md' : 'zero'} {...flex}>
      {children}
      {label && (
        <Text variant="14-mid" color="gray">
          {label}
        </Text>
      )}
      <Button
        h={48}
        p="xs"
        minh={48}
        br={5}
        onPress={onPress}
        direction="row"
        align="center"
        disabled={disabled}
        px="md"
        mt={label ? 'xs' : 'zero'}
        bg="white"
        opacity={disabled ? 0.4 : 1}
        justify="space-between">
        <Text variant="14-mid" color="gray">
          {text ?? placeholder}
        </Text>
        <TimePickerIcon Icon={Icon} />
      </Button>
    </View>
  );
};

export default PickerButton;
