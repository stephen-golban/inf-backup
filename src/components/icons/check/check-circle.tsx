import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const CheckCircleIcon: React.FC<SvgProps> = ({ color = '#2F384C', strokeWidth = 1.5, ...props }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M8.5 12.5L11 15l5.5-5.5M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export { CheckCircleIcon };
