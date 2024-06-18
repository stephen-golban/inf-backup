import type { TextProps, ViewProps } from '@components/common';

export enum BadgePlacement {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}

export type BadgeProps = ViewProps & {
  value: number;
  size?: number;
  offset?: number;
  textProps?: TextProps;
  rule?(value: number): string;
  placement?: `${BadgePlacement}`;
};
