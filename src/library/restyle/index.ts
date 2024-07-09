import { createElement, forwardRef } from 'react';
import { useRestyle } from '@shopify/restyle';
import { transformExtendedPropsToStyles } from './util';
import { restyleFunctions, type RestyleProps } from './functions';

import type { RestyleExtendedProps } from './type';
import type { ComponentPropsWithRef, ElementType } from 'react';

type FinalProps = Omit<RestyleProps, 'alignItems' | 'flexDirection' | 'justifyContent' | 'borderRadius' | 'position'> &
  RestyleExtendedProps;

export const createStyled = <E extends ElementType>(Component: E) => {
  return forwardRef<any, FinalProps & ComponentPropsWithRef<E>>((props, ref) => {
    const { fill, absoluteFill, fullSize, center, col, row, around, between, absolute, relative, shadow, ...restyleProps } = props;

    const extendedStyles = transformExtendedPropsToStyles({
      fill,
      shadow,
      absoluteFill,
      fullSize,
      center,
      col,
      row,
      around,
      between,
      absolute,
      relative,
    });

    const { style, ...rest } = useRestyle(restyleFunctions as any, restyleProps);

    const newStyle = [extendedStyles, style];
    const restyledProps = { style: newStyle, ...rest, ref };

    return createElement(Component, { ...restyledProps });
  });
};
