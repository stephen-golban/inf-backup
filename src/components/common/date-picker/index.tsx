import React from 'react';

import { format } from 'date-fns';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import PickerButton from './parts/picker-button';
import usePicker from './hooks';
import { BaseButton } from '../button';
import { View } from '../view';
import { useTheme } from '@theme/index';
import { IPicker } from './types';

interface IDatePickerProps extends IPicker {
  children?: ((date: Date) => React.ReactNode) | React.ReactNode;
}

const DatePicker: React.FC<IDatePickerProps> = props => {
  const { colors } = useTheme();
  const { children, onConfirm, mode = 'date', date, disabled, max, min, ...rest } = props;
  const picker = usePicker({ onConfirm });

  if (children) {
    return (
      <View fill>
        <BaseButton onPress={picker.showDatePicker} disabled={disabled}>
          {typeof children === 'function' ? children(date || new Date()) : children}
        </BaseButton>

        <DateTimePickerModal
          //   locale={lang as string}
          date={date}
          mode={mode}
          display="spinner"
          minimumDate={min}
          maximumDate={max}
          textColor={colors.gray}
          onCancel={picker.hideDatePicker}
          onConfirm={picker.handleConfirm}
          isVisible={picker.isDatePickerOpen}
          //   isDarkModeEnabled={theme === 'dark'}
        />
      </View>
    );
  }
  return (
    <PickerButton onPress={picker.showDatePicker} text={date ? format(date, 'dd/MM/yyyy') : rest.placeholder} disabled={disabled} {...rest}>
      <DateTimePickerModal
        mode={mode}
        date={date}
        display="spinner"
        minimumDate={min}
        maximumDate={max}
        disabled={disabled}
        textColor={colors.gray}
        onCancel={picker.hideDatePicker}
        onConfirm={picker.handleConfirm}
        isVisible={picker.isDatePickerOpen}
        // isDarkModeEnabled={theme === 'dark'}
      />
    </PickerButton>
  );
};

export default DatePicker;
