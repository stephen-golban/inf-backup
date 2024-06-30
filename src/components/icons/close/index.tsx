import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const CloseIcon: React.FC<SvgProps> = ({ color = '#0F173A', ...props }) => (
  <Svg width={24} height={25} viewBox="0 0 24 25" fill="none" {...props}>
    <Path d="M18 6.41l-12 12M6 6.41l12 12" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export { CloseIcon };
