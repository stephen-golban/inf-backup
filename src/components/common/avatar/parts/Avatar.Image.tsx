import React from 'react';

import AvatarBase from './Avatar.Base';
import { Image } from '@components/common/image';

import type { AvatarImageProps } from '../type';

const AvatarImage: React.FC<AvatarImageProps> = ({ source, size = 50, badgeProps, children, br = 'huge', ...rest }) => {
  return (
    <AvatarBase size={size}>
      <Image source={source} w={size} h={size} center br={br} loaderSize="small" {...rest} />
    </AvatarBase>
  );
};

export default AvatarImage;
