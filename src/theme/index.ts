import COLORS, { DARK_THEME_BASE_COLORS } from './colors';
import TEXT_VARIANTS from './font';
import { SPACING, RADII, Z_INDICES } from './metrics';
import { createTheme, useTheme as useShopifyTheme } from '@shopify/restyle';
import LAYOUT from './layout';
import { SHADOWS } from './shadows';

type AppTheme = typeof LIGHT;
type ThemeType = keyof typeof THEME;

const LIGHT = createTheme({
  colors: COLORS,
  layout: LAYOUT,
  shadows: SHADOWS,
  spacing: SPACING,
  borderRadii: RADII,
  zIndices: Z_INDICES,
  textVariants: TEXT_VARIANTS,
});
const DARK = { ...LIGHT, colors: DARK_THEME_BASE_COLORS };

const THEME = {
  dark: DARK,
  light: LIGHT,
};

const useTheme = () => {
  const theme = useShopifyTheme<AppTheme>();

  return theme;
};

export { THEME, useTheme };

export type { AppTheme, ThemeType };
