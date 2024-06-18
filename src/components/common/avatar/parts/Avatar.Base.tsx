import React from 'react';

import { Badge } from '@components/ui';
import { View, type ViewProps } from '@components/common/view';

import type { BaseAvatarProps } from '../type';

const AvatarBase: React.FC<BaseAvatarProps & ViewProps> = ({ size = 50, badgeProps, children, ...rest }) => {
  return (
    <View w={size} h={size} {...rest}>
      {children}
      {badgeProps && <Badge {...badgeProps} />}
    </View>
  );
};

export default AvatarBase;
