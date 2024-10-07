import * as React from 'react';
import Svg, { Defs, Path, SvgProps } from 'react-native-svg';

const ForwardToInboxIcon: React.FC<SvgProps> = ({ color = '#21338e', ...props }) => {
  return (
    <Svg viewBox="0 0 22 20" width={22} height={20} fill="none" {...props}>
      <Svg height={20} width={20} viewBox="0 0 24 24" fill={color} x={1} opacity="100%" {...props}>
        <Path fill="none" d="M0 0h24v24H0z" />
        <Path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9v-2H4V8l8 5 8-5v5h2V6c0-1.1-.9-2-2-2zm-8 7L4 6h16l-8 5zm7 4l4 4-4 4v-3h-4v-2h4v-3z" />
      </Svg>
      <Defs></Defs>
    </Svg>
  );
};

export { ForwardToInboxIcon };
