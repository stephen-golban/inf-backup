import React from 'react';

import { Badge } from '@components/ui';
import { BaseButton, ButtonProps } from '@components/common/button';
import { View, type ViewProps } from '@components/common/view';

import type { BaseAvatarProps } from '../type';

interface IAvatarBase extends BaseAvatarProps, ViewProps, Pick<ButtonProps, 'onPress'> {}

const AvatarBase: React.FC<IAvatarBase> = ({ size = 50, badgeProps, children, onPress, ...rest }) => {
  const Wrapper = onPress ? BaseButton : View;

  return (
    <Wrapper w={size} h={size} onPress={onPress} {...rest}>
      {children}
      {badgeProps && <Badge {...badgeProps} />}
    </Wrapper>
  );
};

export default AvatarBase;
