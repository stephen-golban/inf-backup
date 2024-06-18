const SPACING = {
  zero: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  huge: 80,
  xhuge: 96,
  xxhuge: 128,
};

const RADII = { ...SPACING, round: 999 };
const Z_INDICES = { ...SPACING, '-999': -999, 999: 999 };

export { SPACING, RADII, Z_INDICES };
export type Radius = keyof typeof RADII | number;
export type Spacing = keyof typeof SPACING | number;
