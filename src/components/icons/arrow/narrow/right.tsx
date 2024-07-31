import * as React from 'react';
import Svg, { Defs, Path, SvgProps } from 'react-native-svg';

const ArrowNarrowRight: React.FC<SvgProps> = ({ color = '#030303', ...props }) => {
  return (
    <Svg viewBox="0 0 8 8" width={8} height={8} fill="none" {...props}>
      <Svg height={10} width={10} viewBox="0 0 24 24" fill={color} opacity="100%" {...props}>
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
      </Svg>
      <Defs></Defs>
    </Svg>
  );
};

export { ArrowNarrowRight };
