import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const RefreshIcon: React.FC<SvgProps> = ({ color = '#fff', ...props }) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <Path d="M21 12a9 9 0 00-9-9 9.75 9.75 0 00-6.74 2.74L3 8" />
      <Path d="M3 3v5h5M3 12a9 9 0 009 9 9.75 9.75 0 006.74-2.74L21 16" />
      <Path d="M16 16h5v5" />
    </Svg>
  );
};

export { RefreshIcon };
