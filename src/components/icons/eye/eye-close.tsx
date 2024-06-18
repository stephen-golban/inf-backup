import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const EyeCloseIcon: React.FC<SvgProps> = ({ color = '#2F384C', strokeWidth = 2, ...props }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M3 3l2.826 2.826M21 21l-2.826-2.826m0 0C16.63 19.248 14.588 20 12 20c-7 0-10-5.5-10-8 0-1.576 1.192-4.343 3.826-6.174m12.348 12.348l-4.053-4.053M5.826 5.826l4.053 4.053m0 0a3 3 0 104.243 4.243M9.878 9.878l4.242 4.242M20.42 16c.123-.166.239-.333.347-.5C21.605 14.21 22 12.907 22 12c0-2.5-3-8-10-8-1.097 0-2.096.135-3 .372-.17.045-.337.093-.5.145"
        stroke="#2F384C"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export { EyeCloseIcon };
