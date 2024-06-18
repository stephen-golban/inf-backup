import type { TextProps } from '../text';
import type { ViewProps } from '../view';
import type { ImageProps } from '../image';
import type { BadgeProps } from '@components/ui';

export type AvatarImageProps = ImageProps & BaseAvatarProps;
export type AvatarTextProps = { label: string; textProps?: TextProps } & BaseAvatarProps & ViewProps;

export type BaseAvatarProps = {
  size?: number;
  badgeProps?: BadgeProps;
};
