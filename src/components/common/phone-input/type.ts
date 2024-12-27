import type { TextInputProps } from '../text-input';

export interface PhoneInputProps extends Omit<TextInputProps, 'onChange' | 'onChangeText'> {
  name?: string;
  disabled?: boolean;
  onChangeText: (txt: string) => void;
}
