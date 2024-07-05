import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

const HomeIcon: React.FC<SvgProps> = ({ color = '#fff', strokeWidth = 2, ...props }) => {
  return (
    <Svg viewBox="0 0 24 24" fill={color} {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </Svg>
  );
};
export { HomeIcon };
