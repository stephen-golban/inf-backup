import React from 'react';

import { useTheme } from '@theme/index';
import { isTypeof } from '@library/method';

import * as ICONS from '@components/icons';
import { BaseButton, ButtonProps } from '../button';
import { ActivityIndicator } from '../activity-indicator';

import type { Color } from '@theme/colors';
import type { Spacing } from '@theme/metrics';
import type { SvgProps } from 'react-native-svg';

type IconType = keyof typeof ICONS;

type IconProps = Pick<SvgProps, 'strokeWidth'> &
  ButtonProps & {
    color?: Color;
    icon: IconType;
    size?: number | Spacing;
    iconProps?: React.ComponentProps<(typeof ICONS)[IconType]>;
  };

const Icon = React.forwardRef<any, IconProps>(({ icon, size, onPress, color, strokeWidth, iconProps, loading, ...props }, ref) => {
  const { colors, spacing } = useTheme();
  const Component = ICONS[icon];
  const COLOR = color ? { color: colors[color] } : { color };

  const SIZE = isTypeof(size, 'string') ? spacing[size] : size;

  const sizeProps = SIZE ? { width: SIZE, height: SIZE } : {};

  return (
    <BaseButton ref={ref as any} opacity={1} {...props} onPress={onPress} disabled={!isTypeof(onPress, 'function') || props.disabled}>
      {loading ? <ActivityIndicator /> : <Component {...COLOR} disabled strokeWidth={strokeWidth} {...sizeProps} {...iconProps} />}
    </BaseButton>
  );
});

export { Icon, type IconType, type IconProps };
