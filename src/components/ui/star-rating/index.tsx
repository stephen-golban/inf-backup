import React from 'react';

import { noop } from 'lodash';

import StarRatingItem from './star-rating-item';
import NStarRating from 'react-native-star-rating-widget';

import type { Color } from '@theme/colors';

interface IStarRating {
  rating: number;
  color?: Color;
  starSize?: number;
  disabled?: boolean;
  starPathColor?: Color;
  enableHalfStar?: boolean;
  onChange?(rating: number): void;
}

const StarRating: React.FC<IStarRating> = ({
  rating,
  enableHalfStar,
  disabled,
  starSize = 32,
  onChange,
  color = 'gold',
  starPathColor = color,
}) => {
  const renderStarIconComponent = (size: number, type: 'empty' | 'full' | 'half') => (
    <StarRatingItem index={Math.random()} color={color} size={size} type={type} starPathColor={starPathColor} />
  );

  return (
    <NStarRating
      rating={rating}
      starSize={starSize}
      onChange={onChange || noop}
      enableHalfStar={enableHalfStar}
      animationConfig={{ scale: disabled ? 1 : 1.1 }}
      StarIconComponent={({ size, type }) => renderStarIconComponent(size, type)}
    />
  );
};

export { StarRating };
