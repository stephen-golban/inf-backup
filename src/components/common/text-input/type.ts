import { ReactNode } from 'react';

import { IconProps, IconType } from '../icon';
import { Color } from '@theme/colors';
import { SharedValue } from 'react-native-reanimated';
import { TextInputProps as RNTextInputProps } from 'react-native';
import { I18nKey } from '@translations/locales';

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
   * pass icon props for the passed icon name
   * @default undefined
   */
  iconProps?: Omit<IconProps, 'icon'>;
  /**
   * pass a prefix component to be displayed
   * @default undefined
   */
  prefix?: JSX.Element;
  /**
   * pass icon name to be displayed
   * @default undefined
   */
  sufix?: JSX.Element;
  /**
   * pass icon name to be displayed
   * @default undefined
   */
  icon?: IconType;
  /**
   * Format text before call onChangeText function
   * @default undefined
   */
  rxFormat?: RegExp;

  /**
   * Translate placeholder by I18n
   * @default undefined
   */
  placeholderI18n?: I18nKey;

  /**
   * Fill placeholder color by Theme
   * @default undefined
   */
  placeholderTextColor?: Color;

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
  labelI18n?: I18nKey;

  /**
   * Add red dot right label or not
   * @default false
   */
  required?: boolean;
};
