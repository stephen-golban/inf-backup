import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

const UserIcon: React.FC<SvgProps> = ({ color = '#fff', strokeWidth = 2, ...props }) => {
  return (
    <Svg viewBox="0 0 512 512" width={24} height={24} fill={color} {...props}>
      <Path d="M256 288c79.53 0 144-64.47 144-144s-64.47-144-144-144c-79.52 0-144 64.47-144 144S176.5 288 256 288zM351.1 320H160c-88.36 0-160 71.63-160 160c0 17.67 14.33 32 31.1 32H480c17.67 0 31.1-14.33 31.1-32C512 391.6 440.4 320 351.1 320z" />
    </Svg>
  );
};

export { UserIcon };
