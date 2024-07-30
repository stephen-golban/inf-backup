import React from 'react';

import { Icon } from '@components/common';

import type { Color } from '@theme/colors';
import type { StarIconProps } from 'react-native-star-rating-widget';

interface IStarRatingItem extends Omit<StarIconProps, 'color'> {
  color: Color;
  starPathColor?: Color;
}

const StarRatingItem: React.FC<IStarRatingItem> = ({ color, size, type, starPathColor = color }) => {
  return (
    <Icon color={type === 'empty' ? starPathColor : color} size={size} icon={type === 'empty' ? 'StarOutlinedIcon' : 'StarFilledIcon'} />
  );
};

export default StarRatingItem;
