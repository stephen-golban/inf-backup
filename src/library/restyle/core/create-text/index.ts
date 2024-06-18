import React from 'react';

import {
  color,
  opacity,
  spacing,
  textShadow,
  typography,
  type ColorProps,
  type OpacityProps,
  type SpacingProps,
  type TextShadowProps,
  type TypographyProps,
} from '../../properties';
import { createVariant, type VariantProps } from '../create-variant';
import type { BaseTheme, RestyleFunctionContainer } from '../../typings';

import { Text } from 'react-native';
import { buildRestyleComponent } from '../build-restyle-component';
import type { AppTheme } from '@theme/index';
import { useRestyleTheme } from '@library/restyle/theme';

type TextRestyleProps<Theme extends BaseTheme> = ColorProps<Theme> &
  OpacityProps &
  TypographyProps &
  SpacingProps<Theme> &
  TextShadowProps<Theme> &
  VariantProps<Theme, 'textVariants'> & {
    children?: React.ReactNode;
  };

const textRestyleFunctions = <T extends BaseTheme>(theme: T) => [
  color,
  opacity,
  typography,
  spacing(theme),
  textShadow,
  createVariant({ themeKey: 'textVariants' }),
];

const createText = () => {
  const theme = useRestyleTheme<AppTheme>();
  return buildRestyleComponent<TextRestyleProps<AppTheme> & React.ComponentProps<typeof Text>, AppTheme>(
    textRestyleFunctions(theme) as RestyleFunctionContainer<TextRestyleProps<AppTheme>, AppTheme>[],
    Text,
  );
};

export { createText, textRestyleFunctions, type TextRestyleProps };
