import * as React from 'react';

import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

function RO(props: SvgProps) {
  return (
    <Svg width={21} height={15} viewBox="0 0 21 15" fill="none" {...props}>
      <Rect width={21} height={15} rx={2} fill="#FFDA2C" />
      <Path d="M0 2a2 2 0 012-2h5v15H2a2 2 0 01-2-2V2z" fill="#1A47B8" />
      <Path d="M14 0h5a2 2 0 012 2v11a2 2 0 01-2 2h-5V0z" fill="#F93939" />
    </Svg>
  );
}

export { RO };
