import { IconType } from '../icon';
import { DateTimePickerProps } from 'react-native-modal-datetime-picker';

export type IPicker = {
  min?: Date;
  max?: Date;
  date?: Date;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  Icon?: JSX.Element | IconType;
  isColumnAppearance?: boolean;
} & Required<Pick<DateTimePickerProps, 'onConfirm'>> &
  Pick<DateTimePickerProps, 'mode'>;
