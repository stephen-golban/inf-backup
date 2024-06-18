import React from 'react';

import useStyles from './index.style';
import { useTheme } from '@theme/index';
import { isEmpty, truncate } from 'lodash';

import { View } from '../view';
import { Text } from '../text';
import { Icon } from '../icon';
import SelectDropdown from 'react-native-select-dropdown';

import type { Color } from '@theme/colors';

interface IDropdown<T extends any> {
  data: T[];
  bg?: Color;
  defaultValue?: T;
  placeholder?: string;
  onChange?(arg: T, index: number): void;
}

const Dropdown = <T extends any>(props: IDropdown<T>) => {
  const { data, onChange, defaultValue, bg = 'lightGray_to_lightBlue', placeholder = 'Select...' } = props;

  const { colors } = useTheme();
  const styles = useStyles(colors[bg]);

  return (
    <View h={48} w="100%">
      <SelectDropdown
        data={data}
        defaultValue={defaultValue}
        dropdownOverlayColor="transparent"
        dropdownStyle={styles.dropdownStyle}
        onSelect={(selectedItem, index) => {
          return onChange?.(selectedItem, index);
        }}
        renderButton={(item, isOpened) => {
          return (
            <View style={styles.buttonStyle}>
              {!item || isEmpty(item) ? (
                <Text variant="14-semi">{placeholder}</Text>
              ) : (
                <Text variant="16-semi">{truncate(item, { length: 42, omission: '...' })}</Text>
              )}
              <Icon size={13} icon={isOpened ? 'ChevronUp' : 'ChevronDown'} ml="md" />
            </View>
          );
        }}
        renderItem={(item, idx, isSelected) => (
          <View h={48} style={styles.rowStyle(idx)}>
            <Text variant={isSelected ? '14-semi' : '14-reg'}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export { Dropdown };
