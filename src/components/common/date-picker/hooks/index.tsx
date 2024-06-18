import React from 'react';
import { IPicker } from '../types';

const usePicker = ({ onConfirm }: Pick<IPicker, 'onConfirm'>) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);

  const showDatePicker = () => {
    return setIsDatePickerOpen(true);
  };

  const hideDatePicker = () => {
    return setIsDatePickerOpen(false);
  };

  const handleConfirm = (time: Date) => {
    hideDatePicker();
    return onConfirm(time);
  };

  return {
    isDatePickerOpen,
    handleConfirm,
    showDatePicker,
    hideDatePicker,
  };
};

export default usePicker;
