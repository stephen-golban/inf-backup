import React from 'react';
import { StyleSheet } from 'react-native';

import { useStyle } from '@library/hooks';

import * as SelectPrimitive from '@rn-primitives/select';
import { Icon, ScrollView, Text } from '@components/common';

import style from './style';

type SelectOption = NonNullable<SelectPrimitive.Option>;

interface SelectProps {
  data: SelectOption[];
  placeholder?: string;
  side?: 'bottom' | 'top';
  defaultValue?: SelectOption;
  value?: SelectPrimitive.Option;
  onValueChange: (value: SelectPrimitive.Option) => void;
}

const Select: React.FC<SelectProps> = ({ data, value, defaultValue, placeholder = 'Select an option', side = 'bottom', onValueChange }) => {
  const styles = useStyle(style);

  const [contentWidth, setContentWidth] = React.useState(0);

  return (
    <SelectPrimitive.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger style={styles.trigger} onLayout={e => setContentWidth(e.nativeEvent.layout.width)}>
        <SelectPrimitive.Value placeholder={placeholder} style={value ? styles.itemText : styles.placeholder} />
        <Icon icon="ChevronDown" size={12} />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Overlay style={[StyleSheet.absoluteFill, { flex: 1 }]}>
          <SelectPrimitive.Content style={[styles.content, { width: contentWidth }]} side={side} sideOffset={5}>
            <SelectPrimitive.ScrollUpButton />
            <SelectPrimitive.Viewport>
              <SelectPrimitive.Group>
                <ScrollView>
                  {data.map(option => (
                    <SelectPrimitive.Item key={option.value} label={option.label} value={option.value} style={styles.item}>
                      <Text>{option.label}</Text>
                      <SelectPrimitive.ItemIndicator />
                    </SelectPrimitive.Item>
                  ))}
                </ScrollView>
              </SelectPrimitive.Group>
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton />
          </SelectPrimitive.Content>
        </SelectPrimitive.Overlay>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export { Select };
export type { SelectOption, SelectProps };
