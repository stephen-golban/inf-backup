import React from 'react';
import Svg, { Path, Defs, SvgProps } from 'react-native-svg';

const ShieldSuccessIcon: React.FC<SvgProps> = props => (
  <Svg viewBox="0 0 24 17" width={24} height={17} fill="none" {...props}>
    <Svg height={17} width={17} viewBox="0 0 24 24" fill="#21c0a5" x={3.5} opacity="100%" {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </Svg>
    <Defs></Defs>
  </Svg>
);

export { ShieldSuccessIcon };
