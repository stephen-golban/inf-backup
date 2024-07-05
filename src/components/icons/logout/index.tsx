import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

const LogoutIcon: React.FC<SvgProps> = ({ color = '#fff', strokeWidth = 2, ...props }) => {
  return (
    <Svg viewBox="0 0 24 24" width={25} height={25} fill={color} {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    </Svg>
  );
};

export { LogoutIcon };
