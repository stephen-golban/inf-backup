import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const ApprovalIcon: React.FC<SvgProps> = ({ color = '#21338e', ...props }) => {
  return (
    <Svg height={14} width={14} viewBox="0 0 24 24" fill={color} x={6.5} y={6} {...props}>
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path d="M17 19.22H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7.22z" />
      <Path d="M19 2h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V7h3V5h-3V2zM7 9h8v2H7zm0 3v2h8v-2h-3zm0 3h8v2H7z" />
    </Svg>
  );
};

export { ApprovalIcon };
