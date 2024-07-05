import React from 'react';

import AvatarBase from './Avatar.Base';
import { Image } from '@components/common/image';

import type { AvatarImageProps } from '../type';
import { ButtonProps } from '@components/common/button';

interface IAvatarImage extends AvatarImageProps, Pick<ButtonProps, 'onPress'> {}

const AvatarImage: React.FC<IAvatarImage> = ({ source, size = 50, onPress, badgeProps, children, br = 'huge', ...rest }) => {
  return (
    <AvatarBase size={size} onPress={onPress}>
      <Image source={source} w={size} h={size} center br={br} loaderSize="small" {...rest} />
    </AvatarBase>
  );
};

export default AvatarImage;
