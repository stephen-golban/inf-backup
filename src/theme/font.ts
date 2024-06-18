import { sizeScale } from '@library/scale';
import { StyleSheet } from 'react-native';

const Fonts = {
  primary: 'Satoshi-Variable',
  secondary: 'Sacramento-Regular',
};

type TextVariant = keyof TextVariants;
type TextVariants = typeof TEXT_VARIANTS;

const TEXT_VARIANTS = StyleSheet.create({
  '10-reg': {
    fontWeight: '400',
    fontSize: sizeScale(10),
    fontFamily: Fonts.primary,
  },
  '10-med': {
    fontWeight: '500',
    fontSize: sizeScale(10),
    fontFamily: Fonts.primary,
  },
  '10-semi': {
    fontWeight: '600',
    fontSize: sizeScale(10),
    fontFamily: Fonts.primary,
  },
  '10-bold': {
    fontWeight: '700',
    fontSize: sizeScale(10),
    fontFamily: Fonts.primary,
  },

  '12-reg': {
    fontWeight: '400',
    fontSize: sizeScale(12),
    fontFamily: Fonts.primary,
  },
  '12-med': {
    fontWeight: '500',
    fontSize: sizeScale(12),
    fontFamily: Fonts.primary,
  },
  '12-semi': {
    fontWeight: '600',
    fontSize: sizeScale(12),
    fontFamily: Fonts.primary,
  },
  '12-bold': {
    fontWeight: '700',
    fontSize: sizeScale(12),
    fontFamily: Fonts.primary,
  },

  '14-reg': {
    fontWeight: '400',
    fontSize: sizeScale(14),
    fontFamily: Fonts.primary,
  },
  '14-med': {
    fontWeight: '500',
    fontSize: sizeScale(14),
    fontFamily: Fonts.primary,
  },
  '14-semi': {
    fontWeight: '600',
    fontSize: sizeScale(14),
    fontFamily: Fonts.primary,
  },
  '14-bold': {
    fontWeight: '700',
    fontSize: sizeScale(14),
    fontFamily: Fonts.primary,
  },

  '16-reg': {
    fontWeight: '400',
    fontSize: sizeScale(16),
    fontFamily: Fonts.primary,
  },
  '16-med': {
    fontWeight: '500',
    fontSize: sizeScale(16),
    fontFamily: Fonts.primary,
  },
  '16-semi': {
    fontWeight: '600',
    fontSize: sizeScale(16),
    fontFamily: Fonts.primary,
  },
  '16-bold': {
    fontWeight: '700',
    fontSize: sizeScale(16),
    fontFamily: Fonts.primary,
  },

  '18-reg': {
    fontWeight: '400',
    fontSize: sizeScale(18),
    fontFamily: Fonts.primary,
  },
  '18-med': {
    fontWeight: '500',
    fontSize: sizeScale(18),
    fontFamily: Fonts.primary,
  },
  '18-semi': {
    fontWeight: '600',
    fontSize: sizeScale(18),
    fontFamily: Fonts.primary,
  },
  '18-bold': {
    fontWeight: '700',
    fontSize: sizeScale(18),
    fontFamily: Fonts.primary,
  },

  '20-reg': {
    fontWeight: '400',
    fontSize: sizeScale(20),
    fontFamily: Fonts.primary,
  },
  '20-med': {
    fontWeight: '500',
    fontSize: sizeScale(20),
    fontFamily: Fonts.primary,
  },
  '20-semi': {
    fontWeight: '600',
    fontSize: sizeScale(20),
    fontFamily: Fonts.primary,
  },
  '20-bold': {
    fontWeight: '700',
    fontSize: sizeScale(20),
    fontFamily: Fonts.primary,
  },

  '24-reg': {
    fontWeight: '400',
    fontSize: sizeScale(24),
    fontFamily: Fonts.primary,
  },
  '24-med': {
    fontWeight: '500',
    fontSize: sizeScale(24),
    fontFamily: Fonts.primary,
  },
  '24-semi': {
    fontWeight: '600',
    fontSize: sizeScale(24),
    fontFamily: Fonts.primary,
  },
  '24-bold': {
    fontWeight: '700',
    fontSize: sizeScale(24),
    fontFamily: Fonts.primary,
  },

  '32-reg': {
    fontWeight: '400',
    fontSize: sizeScale(32),
    fontFamily: Fonts.primary,
  },
  '32-med': {
    fontWeight: '500',
    fontSize: sizeScale(32),
    fontFamily: Fonts.primary,
  },
  '32-semi': {
    fontWeight: '600',
    fontSize: sizeScale(32),
    fontFamily: Fonts.primary,
  },
  '32-bold': {
    fontWeight: '700',
    fontSize: sizeScale(32),
    fontFamily: Fonts.primary,
  },

  '40-reg': {
    fontWeight: '400',
    fontSize: sizeScale(40),
    fontFamily: Fonts.primary,
  },
  '40-med': {
    fontWeight: '500',
    fontSize: sizeScale(40),
    fontFamily: Fonts.primary,
  },
  '40-semi': {
    fontWeight: '600',
    fontSize: sizeScale(40),
    fontFamily: Fonts.primary,
  },
  '40-bold': {
    fontWeight: '700',
    fontSize: sizeScale(40),
    fontFamily: Fonts.primary,
  },

  '56-reg': {
    fontWeight: '400',
    fontSize: sizeScale(56),
    fontFamily: Fonts.primary,
  },
  '56-med': {
    fontWeight: '500',
    fontSize: sizeScale(56),
    fontFamily: Fonts.primary,
  },
  '56-semi': {
    fontWeight: '600',
    fontSize: sizeScale(56),
    fontFamily: Fonts.primary,
  },
  '56-bold': {
    fontWeight: '700',
    fontSize: sizeScale(56),
    fontFamily: Fonts.primary,
  },

  defaults: {
    fontWeight: '400',
    fontSize: sizeScale(14),
    fontFamily: Fonts.primary,
  },
});

export default TEXT_VARIANTS;

export type { TextVariant, TextVariants };
