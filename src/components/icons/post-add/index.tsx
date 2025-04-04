import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const PostAddIcon: React.FC<SvgProps> = ({ color = '#21338e', ...props }) => {
  return (
    <Svg height={14} width={14} viewBox="0 0 24 24" fill={color} x={6} y={5} {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M4 16v6h16v-6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2zm14 2H6v-2h12v2zM12 2C9.24 2 7 4.24 7 7l5 7 5-7c0-2.76-2.24-5-5-5zm0 9L9 7c0-1.66 1.34-3 3-3s3 1.34 3 3l-3 4z" />
    </Svg>
  );
};

export { PostAddIcon };
