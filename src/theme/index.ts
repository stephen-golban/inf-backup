import { useAppStore } from '@store/app';
import COLORS, { DARK_THEME_BASE_COLORS } from './colors';
import TEXT_VARIANTS from './font';
import { SPACING, RADII, Z_INDICES } from './metrics';
import { createTheme, useRestyleTheme } from '@library/restyle';
import LAYOUT from './layout';

type AppTheme = typeof LIGHT;
type ThemeType = keyof typeof THEME;

const LIGHT = createTheme({
  colors: COLORS,
  layout: LAYOUT,
  metrics: SPACING,
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
  const theme = useRestyleTheme<AppTheme>();

  return theme;
};

const currentTheme = THEME[useAppStore.getState().theme];

export { THEME, currentTheme, useTheme };

export type { AppTheme, ThemeType };
