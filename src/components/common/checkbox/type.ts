import { ViewProps } from '../view';

export type CheckboxProps = Pick<ViewProps, 'children'> & {
  /**
   * horizontal flex-directions
   * @default false
   */
  reverse?: boolean;
  /**
   * Default state of checkbox
   * @default false
   */
  initialValue?: boolean;

  /**
   * checkbox button size
   * @default 24
   */
  size?: number;

  /**
   * checkbox check icon size
   * @default 16
   */
  checkIconSize?: number;

  /**
   * Overwrite value
   * @default undefined
   */
  value?: boolean;

  /**
   * On checkbox button press
   */
  onToggle?: (value: boolean) => void;

  /**
   * checkbox button is disabled
   * @default false
   */
  disabled?: boolean;
};
