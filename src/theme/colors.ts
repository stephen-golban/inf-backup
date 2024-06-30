const palette = {
  black: '#030303',
  white: 'rgb(255,255,255)',
  transparent: 'transparent',

  black_40: 'rgba(0,0,0,0.4)',
  black_50: 'rgba(0,0,0,0.5)',
  black_60: 'rgba(0,0,0,0.6)',
  black_70: 'rgba(0,0,0,0.7)',
  black_80: 'rgba(0,0,0,0.8)',

  lightBlue: 'rgb(205, 220, 242)',
  skyBlue: 'rgb(6, 95, 224)',
  blue: 'rgb(33, 51, 142)',
  blue_7: 'rgba(33, 51, 142, 0.7)',
  richBlue: 'rgb(19, 31, 54)',

  lightGray: 'rgb(241, 241, 241)',
  softGray: 'rgb(232, 232, 232)',
  mediumGray: 'rgb(223, 223, 223)',
  gray: 'rgb(107, 107, 107)',
  gray_80: 'rgb(204, 204, 204)', // #cccccc

  gold: 'rgb(255, 204, 0)',

  error: 'rgb(220, 20, 60)',
  success: 'rgb(58, 181, 75)',
};

export const LIGHT_THEME_BASE_COLORS = {
  ...palette,

  primary: palette.white,
  secondary: palette.black,

  lightGray_to_lightBlue: palette.lightGray,

  disabledButton: palette.blue_7,

  // * white color variants
  white_to_black: palette.white,
  // * white color variants
};

export const DARK_THEME_BASE_COLORS = {
  ...palette,

  primary: palette.richBlue,
  secondary: palette.white,

  lightGray_to_lightBlue: palette.lightBlue,

  disabledButton: palette.blue_7,

  // * white color variants
  white_to_black: palette.black,
  // * white color variants
};

const COLORS = { ...DARK_THEME_BASE_COLORS, ...LIGHT_THEME_BASE_COLORS };

type Color = keyof Colors;
type Colors = typeof COLORS;

export default COLORS;
export type { Color, Colors };
