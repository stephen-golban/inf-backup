import * as React from 'react';
import Svg, { Defs, Path, SvgProps } from 'react-native-svg';

const MailIcon: React.FC<SvgProps> = ({ color = '#21338e', ...rest }) => {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...rest}>
      <Svg height={24} width={24} viewBox="0 0 24 24" fill="#21338e" opacity="100%" {...rest}>
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </Svg>
      <Defs></Defs>
    </Svg>
  );
};

export { MailIcon };
