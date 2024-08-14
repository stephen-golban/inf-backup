import * as React from 'react';
import Svg, { Defs, Path, SvgProps } from 'react-native-svg';

const DangerIcon: React.FC<SvgProps> = ({ color = '#ef0d0d', ...props }) => (
  <Svg viewBox="0 0 12 12" width={12} height={12} fill="none" {...props}>
    <Svg height={12} width={12} viewBox="0 0 24 24" fill={color} opacity="100%" {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </Svg>
    <Defs></Defs>
  </Svg>
);
export { DangerIcon };
