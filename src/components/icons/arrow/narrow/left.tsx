import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const ArrowNarrowLeft: React.FC<SvgProps> = ({ color = '#111827', ...props }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M7 16l-4-4m0 0l4-4m-4 4h18" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export { ArrowNarrowLeft };
