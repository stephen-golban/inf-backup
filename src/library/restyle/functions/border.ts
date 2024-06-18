import { getKeys } from '../util';
import { type Color } from '@theme/colors';
import { type ViewStyle } from 'react-native';
import { RADII, type Radius } from '@theme/metrics';
import { createRestyleFunction, type RNStyleProperty } from '@shopify/restyle';

const borderProperties = {
  bw: 'borderWidth',
  bs: 'borderStyle',
  btw: 'borderTopWidth',
  blw: 'borderLeftWidth',
  brw: 'borderRightWidth',
  bbw: 'borderBottomWidth',
} as const;

const borderRadiusProperties = {
  br: 'borderRadius',
  btlr: 'borderTopLeftRadius',
  btrr: 'borderTopRightRadius',
  bblr: 'borderBottomLeftRadius',
  bbrr: 'borderBottomRightRadius',
} as const;

const borderColorProperties = {
  bc: 'borderColor',
  btc: 'borderTopColor',
  blc: 'borderLeftColor',
  brc: 'borderRightColor',
  bbc: 'borderBottomColor',
} as const;

export const border = [
  ...getKeys(borderProperties).map(property => {
    const styleProperty = borderProperties[property] as RNStyleProperty;
    return createRestyleFunction({
      property,
      styleProperty,
    });
  }),
  ...getKeys(borderColorProperties).map(property => {
    const styleProperty = borderColorProperties[property] as RNStyleProperty;

    return createRestyleFunction({
      property,
      styleProperty,
      themeKey: 'colors',
    });
  }),
  ...getKeys(borderRadiusProperties).map(property => {
    const styleProperty = borderRadiusProperties[property] as RNStyleProperty;

    return createRestyleFunction({
      property,
      styleProperty,
      transform: ({ value }: { value: Radius }) => (typeof value === 'number' ? value : RADII[value]),
    });
  }),
];

export type BorderProps = {
  [Key in keyof typeof borderProperties]?: ViewStyle[(typeof borderProperties)[Key]];
} & {
  [Key in keyof typeof borderColorProperties]?: Color;
} & {
  [Key in keyof typeof borderRadiusProperties]?: Radius;
};
