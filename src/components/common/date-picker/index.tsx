import React, { useImperativeHandle } from 'react';

import usePicker from './hooks';
import { format } from 'date-fns';
import { useTheme } from '@theme/index';

import { View } from '../view';
import { BaseButton } from '../button';
import PickerButton from './parts/picker-button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import type { IPicker } from './type';

interface IDatePickerProps extends IPicker {
  children?: ((date: Date) => React.ReactNode) | React.ReactNode;
}

const DatePicker = React.forwardRef<any, IDatePickerProps>((props, ref) => {
  const { colors } = useTheme();
  const { children, onConfirm, mode = 'date', date, disabled, max, min, ...rest } = props;
  const picker = usePicker({ onConfirm });

  useImperativeHandle(ref, () => ({ show: picker.showDatePicker }));

  if (children) {
    return (
      <View fill>
        <BaseButton onPress={picker.showDatePicker} disabled={disabled}>
          {typeof children === 'function' ? children(date || new Date()) : children}
        </BaseButton>

        <DateTimePickerModal
          ref={ref}
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
});

export { DatePicker };
