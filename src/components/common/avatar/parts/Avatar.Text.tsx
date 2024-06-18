import React from 'react';

import { getInitials, isInitials } from '../util';
import { calculateRatioFontSize } from '@library/scale';

import AvatarBase from './Avatar.Base';
import { Text } from '@components/common/text';

import type { AvatarTextProps } from '../type';

const AvatarText: React.FC<AvatarTextProps> = ({ size = 50, label, br = 'huge', textProps, ...rest }) => {
  const fontSize = calculateRatioFontSize(10, size);
  const displayLabel = isInitials(label) ? label : getInitials(label);

  return (
    <AvatarBase size={size} br={br} center bg="gray_80" {...rest}>
      <Text color="blue" includeFontPadding={false} variant="14-bold" fontSize={fontSize} numberOfLines={1} {...textProps}>
        {displayLabel}
      </Text>
    </AvatarBase>
  );
};

export default AvatarText;
