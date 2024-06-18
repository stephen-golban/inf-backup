import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const EyeOpenIcon: React.FC<SvgProps> = ({ color = '#2F384C', strokeWidth = 2, ...props }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M22 12c0 2.5-3 8-10 8S2 14.5 2 12s3-8 10-8 10 5.5 10 8z" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
};

export { EyeOpenIcon };
