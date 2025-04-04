const palette = {
  black: '#030303',
  white: 'rgb(255,255,255)',
  transparent: 'transparent',

  white_50: 'rgb(255,255,255, 0.5)',

  black_20: 'rgba(0,0,0,0.2)',
  black_30: 'rgba(0,0,0,0.3)',
  black_40: 'rgba(0,0,0,0.4)',
  black_50: 'rgba(0,0,0,0.5)',
  black_60: 'rgba(0,0,0,0.6)',
  black_70: 'rgba(0,0,0,0.7)',
  black_80: 'rgba(0,0,0,0.8)',

  lightBlue: 'rgb(205, 220, 242)',
  skyBlue: 'rgb(6, 95, 224)',
  blue: 'rgb(33, 51, 142)',
  blue_6: 'rgba(33, 51, 142, 0.6)',
  blue_7: 'rgba(33, 51, 142, 0.7)',
  richBlue: 'rgb(19, 31, 54)',

  lightGray: 'rgb(241, 241, 241)',
  softGray: 'rgb(232, 232, 232)',
  mediumGray: 'rgb(223, 223, 223)',
  darkGray: 'rgb(66, 66, 66)', // #424242
  gray: 'rgb(107, 107, 107)',
  veryPaleGray: 'rgb(238, 238, 238)', // #eeeeee
  gray_4d: 'rgb(77, 81, 86)', // #4d5156
  gray_f5: 'rgb(245, 245, 245)', // #f5f5f5
  gray_66: 'rgb(102, 102, 102)', // #666666
  gray_7e: 'rgb(126, 126, 126)', // #7e7e7e
  gray_41: 'rgb(104, 107, 107)', // #686b6b
  gray_50: '#7f7f7f',
  gray_80: 'rgb(204, 204, 204)', // #cccccc
  gray_c8: 'rgb(200, 200, 200)', // #c8c8c8

  gold: 'rgb(255, 204, 0)',
  tangerineOrange: 'rgba(253,108,0, 1)',
  goldenYellow: 'rgba(254,194,0, 1)',
  limeGreen: 'rgba(200,221,20, 1)',

  error: 'rgb(220, 20, 60)',
  success: 'rgb(58, 181, 75)',
  forestGreen: 'rgba(107,196,60, 1)',
  teal: '#21c0a5',
  crimsonRed: 'rgba(252,54,50, 1)',

  sunsetOrange: '#f45b31',
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

  primary: palette.white,
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
