import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const MasterCardIcon: React.FC<SvgProps> = props => {
  return (
    <Svg x="0px" y="0px" width="999.2px" height="776px" viewBox="0 0 999.2 776" {...props}>
      <Path fill="#FF5A00" d="M364 66.1H634.4V551.9H364z" />
      <Path
        fill="#EB001B"
        d="M382 309c0-98.7 46.4-186.3 117.6-242.9C447.2 24.9 381.1 0 309 0 138.2 0 0 138.2 0 309s138.2 309 309 309c72.1 0 138.2-24.9 190.6-66.1C428.3 496.1 382 407.7 382 309z"
      />
      <Path
        fill="#F79E1B"
        d="M999.2 309c0 170.8-138.2 309-309 309-72.1 0-138.2-24.9-190.6-66.1 72.1-56.7 117.6-144.2 117.6-242.9S570.8 122.7 499.6 66.1C551.9 24.9 618 0 690.1 0 861 0 999.2 139.1 999.2 309z"
      />
    </Svg>
  );
};

export { MasterCardIcon };
