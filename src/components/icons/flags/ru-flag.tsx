import * as React from 'react';

import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

function RU(props: SvgProps) {
  return (
    <Svg width={21} height={15} viewBox="0 0 21 15" fill="none" {...props}>
      <Rect width={21} height={15} rx={3} fill="#1A47B8" />
      <Path fillRule="evenodd" clipRule="evenodd" d="M0 10h21v5H0v-5z" fill="#F93939" />
      <Path fillRule="evenodd" clipRule="evenodd" d="M0 0h21v5H0V0z" fill="#fff" />
    </Svg>
  );
}

export { RU };
