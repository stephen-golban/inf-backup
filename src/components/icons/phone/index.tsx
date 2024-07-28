import * as React from 'react';
import Svg, { Defs, Path, SvgProps } from 'react-native-svg';

const PhoneIcon: React.FC<SvgProps> = ({ color = '#21338e', ...rest }) => {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...rest}>
      <Svg height={24} width={24} viewBox="0 0 24 24" fill={color} opacity="100%" {...rest}>
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </Svg>
      <Defs></Defs>
    </Svg>
  );
};

export { PhoneIcon };
