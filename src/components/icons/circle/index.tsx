import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const CircleIcon: React.FC<SvgProps> = ({ color = '#0F173A', ...props }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill={color} {...props} color={color}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </Svg>
);

export { CircleIcon };
