import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const CheckCircleIcon: React.FC<SvgProps & { checkColor?: string }> = ({ color = '#3B444D', checkColor = 'white', ...props }) => {
  return (
    <Svg width={22} height={23} viewBox="0 0 22 23" fill="none" {...props}>
      {/* Circle Background */}
      <Path d="M22 11.5c0 6.072-4.928 11-11 11s-11-4.928-11-11S4.928.5 11 .5s11 4.928 11 11z" fill={color} />

      {/* Check Mark */}
      <Path d="M5.133 11.229L9.944 17l7.487-8.837L16.177 7.1l-6.226 7.333-3.556-4.26-1.262 1.056z" fill={checkColor} />
    </Svg>
  );
};

export { CheckCircleIcon };
