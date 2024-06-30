import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const DoubleCheck: React.FC<SvgProps> = ({ color = '#2F384C', strokeWidth = 1.5, ...props }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M1.5 12.5l4.076 4.076a.6.6 0 00.848 0L9 14M16 7l-4 4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M7 12l4.576 4.576a.6.6 0 00.848 0L22 7" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
};

export { DoubleCheck };
