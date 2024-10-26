import React from 'react';
import { StyleSheet } from 'react-native';

import { useStyle } from '@library/hooks';

import * as SelectPrimitive from '@rn-primitives/select';
import { FormInput, Icon, IconType, ScrollView, Text, TextInput, View } from '@components/common';

import style from './style';
import { isEmpty } from 'lodash';
import { Loader } from '@components/ui';

type SelectOption = NonNullable<SelectPrimitive.Option>;

interface SelectProps {
  data: SelectOption[];
  icon?: IconType;
  placeholder?: string;
  loading?: boolean;
  side?: 'bottom' | 'top';
  defaultValue?: SelectOption;
  value?: SelectPrimitive.Option;
  renderEmpty?: React.JSX.Element;
  onValueChange: (value: SelectPrimitive.Option) => void;
  typeable?: boolean;
}

const Select: React.FC<SelectProps> = ({
  data,
  icon,
  value,
  loading,
  renderEmpty,
  defaultValue,
  side = 'bottom',
  placeholder = 'Select an option',
  onValueChange,
  typeable = false,
}) => {
  const styles = useStyle(style);

  const [contentWidth, setContentWidth] = React.useState(0);

  const hasEmpty = !!renderEmpty && isEmpty(data);

  return (
    <SelectPrimitive.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        style={[styles.trigger, { paddingLeft: icon ? 35 : 16 }]}
        onLayout={e => setContentWidth(e.nativeEvent.layout.width)}>
        {icon && <Icon icon={icon} size={20} absolute left={10} />}
        {typeable ? (
          <TextInput
            disableAnimation
            style={styles.input}
            autoCorrect={false}
            autoComplete="email"
            value={value?.value}
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholderI18n="ui:placeholders:custom_email_placeholder"
            onChangeText={txt => onValueChange({ label: txt, value: txt })}
          />
        ) : (
          <SelectPrimitive.Value placeholder={placeholder} style={value ? styles.itemText : styles.placeholder} />
        )}
        <Icon icon="ChevronDown" size={12} absolute right={10} />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Overlay style={[StyleSheet.absoluteFill, { flex: 1 }]}>
          <SelectPrimitive.Content
            side={side}
            sideOffset={5}
            style={[styles.content, { width: contentWidth }, hasEmpty ? { paddingVertical: 0 } : {}]}>
            <SelectPrimitive.ScrollUpButton />
            <SelectPrimitive.Viewport>
              {loading && <Loader />}
              {hasEmpty ? (
                renderEmpty
              ) : (
                <SelectPrimitive.Group>
                  <ScrollView>
                    {data.map((option, idx) => (
                      <SelectPrimitive.Item
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        style={[styles.item, idx === data.length - 1 ? { borderBottomColor: 'transparent' } : {}]}>
                        <Text>
                          {option.label}
                          <View {...StyleSheet.absoluteFillObject} />
                        </Text>
                        <SelectPrimitive.ItemIndicator />
                      </SelectPrimitive.Item>
                    ))}
                  </ScrollView>
                </SelectPrimitive.Group>
              )}
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
