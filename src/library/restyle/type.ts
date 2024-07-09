import { Shadow } from '@theme/shadows';
import { FlexStyle } from 'react-native';

export type RestyleExtendedProps = {
  shadow?: Shadow;
  /**
   * Enable to using {flex:1}
   * @default undefined
   */
  fill?: boolean;

  /**
   * Applies Stylesheet.absoluteFillObject
   * @default undefined
   */
  absoluteFill?: boolean;

  /**
   * Set width = '100%'
   * Set height = '100%'
   * @default undefined
   */
  fullSize?: boolean;

  /**
   * Set true for using alignItems = 'center'
   * Set true for using justifyContent = 'center'
   * @default undefined
   */
  center?: boolean;

  /**
   * Set true for using justifyContent = 'space-between'
   * @default undefined
   */
  between?: boolean;

  /**
   * Set true for using position = 'absolute'
   * @default undefined
   */
  absolute?: boolean;

  /**
   * Set true for using position = 'relative'
   * @default undefined
   */
  relative?: boolean;

  /**
   * Set true for using flexDirection = 'row'
   * @default undefined
   */
  row?: boolean;

  /**
   * Set true for using flexDirection = 'column'
   * @default undefined
   */
  col?: boolean;

  /**
   * Set true for using justifyContent = 'space-around'
   * @default undefined
   */
  around?: boolean;
};

export type ResponsiveValue<T> = T | T[];

export type FlexStyleValidator<
  Keys extends string,
  BaseKeys extends keyof FlexStyle,
  ExtendedKeys extends string,
  ExtendedToFlexStyleMap extends { [K in ExtendedKeys]: keyof FlexStyle },
> = {
  [Key in Keys]?: Key extends ExtendedKeys ? FlexStyle[ExtendedToFlexStyleMap[Key]] : Key extends BaseKeys ? FlexStyle[Key] : never;
};
