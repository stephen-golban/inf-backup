import { ReactNode } from 'react';

import { Color } from '@theme/colors';
import { I18nKeys } from 'translations';
import { UseFormTrigger } from 'react-hook-form';
import { SharedValue } from 'react-native-reanimated';
import { TextInputProps as RNTextInputProps } from 'react-native';

export type ErrorLineProps = {
  error: SharedValue<boolean>;
  disabled: SharedValue<boolean>;
};

export type FocusedLineProps = {
  focused: SharedValue<boolean>;
  disabled: SharedValue<boolean>;
};

export type TextInputProps = RNTextInputProps & {
  /**
   * Format text before call onChangeText function
   * @default undefined
   */
  rxFormat?: RegExp;

  /**
   * Trigger name field of react hook form
   * @default undefined
   */
  nameTrigger?: string;

  /**
   * Call trigger react hook form
   * @default undefined
   */
  trigger?: UseFormTrigger<any>;

  /**
   * Translate placeholder by I18n
   * @default undefined
   */
  placeholderI18n?: I18nKeys;

  /**
   * Fill placeholder color by Theme
   * @default undefined
   */
  placeholderTextColorTheme?: Color;

  /**
   * Children right input.(ex:Icon show/hide password)
   */
  rightChildren?: ReactNode;

  /**
   * Invalid input or not
   * @default false
   */
  error?: boolean;
} & LabelProps;

export type LabelProps = {
  /**
   * Label of text input
   */
  label?: string;

  /**
   * Translate label by I18n
   * @default undefined
   */
  labelI18n?: I18nKeys;

  /**
   * Add red dot right label or not
   * @default false
   */
  required?: boolean;
};
