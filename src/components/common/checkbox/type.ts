import { ButtonProps } from '../button';

export type CheckboxProps = ButtonProps & {
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
   * checkbox button is rounded
   * @default false
   */
  round?: boolean;
};
