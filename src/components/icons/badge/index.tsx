import * as React from 'react';
import Svg, { Path, SvgProps, Text } from 'react-native-svg';

interface BadgeIconProps extends SvgProps {
  number?: number;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ color = '#ff3b30', number = 10, ...props }) => {
  const displayNumber = number > 9 ? '9+' : number.toString();
  return (
    <Svg
      style={{
        width: 24,
        height: 24,
      }}
      viewBox="0 0 24 24"
      {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path
        d="M 21 1 H 7 c -1.1 0 -2 0.9 -2 2 v 14 c 0 1.1 0.9 2 2 2 h 14 c 1.1 0 2 -0.9 2 -2 V 3 c 0 -1.1 -0.9 -2 -2 -2 z m 0 16 H 7 V 3 h 14 v 14 z M 3 5 H 1 v 16 c 0 1.1 0.9 2 2 2 h 16 v -2 H 3 V 5 z z"
        fill={color}
      />
      <Text x="14" y="14" fontSize={number > 9 ? '9' : '12'} fontWeight="bold" textAnchor="middle" fill={color}>
        {displayNumber}
      </Text>
    </Svg>
  );
};

export { BadgeIcon };
