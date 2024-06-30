import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const CheckIcon: React.FC<SvgProps> = ({ color = '#2F384C', strokeWidth = 1.5, ...props }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M4 13l5 5L20 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export { CheckIcon };
