import * as React from 'react';
import Svg, { Defs, Path, SvgProps } from 'react-native-svg';

const InfoIcon: React.FC<SvgProps> = ({ color = '#c2c2c2', ...rest }) => {
  return (
    <Svg viewBox="0 0 20 24" width={20} height={24} fill="none" {...rest}>
      <Svg height={20} width={20} viewBox="0 0 24 24" fill={color} y={2} opacity="100%" {...rest}>
        <Path d="M0 0h24v24H0V0z" fill="none" />
        <Path d="M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </Svg>
      <Defs></Defs>
    </Svg>
  );
};

export { InfoIcon };
