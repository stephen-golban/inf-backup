import type { RestyleExtendedProps } from './type';
import type { RNStyleProperty } from '@shopify/restyle';

import LAYOUT from '@theme/layout';

export const getKeys = <T extends { [key: string]: any }>(object: T) => Object.keys(object) as (keyof T)[];

export const transformExtendedPropsToStyles = (props: RestyleExtendedProps) => {
  return [
    props.row && LAYOUT.row,
    props.col && LAYOUT.col,
    props.fill && LAYOUT.fill,
    props.center && LAYOUT.center,
    props.fullSize && LAYOUT.fullSize,
    props.relative && LAYOUT.relative,
    props.absolute && LAYOUT.absolute,
    props.absoluteFill && LAYOUT.absoluteFill,
    props.around && LAYOUT.justifyContentAround,
    props.between && LAYOUT.justifyContentBetween,
  ];
};

export const transformProperty = <T extends Record<string, any>>(obj: T, property: keyof T) => {
  const value = obj[property];

  const styleProperty = (typeof value === 'boolean' ? property : value) as RNStyleProperty;
  return { property, styleProperty };
};
