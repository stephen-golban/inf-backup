import React from 'react';

import useStyles from './style';
import useDropdown from './hooks';

import { View } from '../view';
import { Text } from '../text';
import { Icon } from '../icon';
import { Dropdown as EDropdown } from 'react-native-element-dropdown';

import type { IDropdown } from './type';

const Dropdown: React.FC<IDropdown> = props => {
  const { data, bg = 'lightGray', placeholder = 'Select...' } = props;

  const styles = useStyles(bg);
  const { colors, value, isFocused, handleOnChange, isLastItem, setIsFocused } = useDropdown(props);

  return (
    <EDropdown
      data={data}
      value={value}
      labelField="label"
      valueField="value"
      onChange={handleOnChange}
      placeholder={placeholder}
      closeModalWhenSelectedItem
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={[styles.buttonStyle, styles.shadow]}
      selectedTextStyle={styles.selectedTextStyle}
      itemContainerStyle={styles.itemContainerStyle}
      containerStyle={[styles.containerStyle, styles.shadow]}
      renderRightIcon={() => <Icon size={13} icon={isFocused ? 'ChevronUp' : 'ChevronDown'} p="lg" />}
      renderItem={(item, isSelected) => (
        <View h={48} style={[styles.rowStyle, { borderBottomColor: isLastItem(item) ? 'transparent' : colors.gray_80 }]}>
          <Text variant={isSelected ? '14-semi' : '14-reg'}>{item.label}</Text>
        </View>
      )}
    />
  );
};

export { Dropdown };
