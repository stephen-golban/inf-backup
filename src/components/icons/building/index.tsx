import * as React from 'react';
import Svg, { Defs, Path, SvgProps } from 'react-native-svg';

const BuildingIcon: React.FC<SvgProps> = ({ color = '#21338e', ...rest }) => {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...rest}>
      <Svg height={24} width={24} viewBox="0 0 24 24" fill={color} opacity="100%" {...rest}>
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" />
      </Svg>
      <Defs></Defs>
    </Svg>
  );
};

export { BuildingIcon };
