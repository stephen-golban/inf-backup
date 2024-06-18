import * as React from 'react';

import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

function EN(props: SvgProps) {
  return (
    <Svg width={21} height={15} viewBox="0 0 21 15" fill="none" {...props}>
      <Rect width={21} height={15} rx={3} fill="#1A47B8" />
      <Path fillRule="evenodd" clipRule="evenodd" d="M2.234 0H0v2.5L18.754 15H21v-2.5L2.234 0z" fill="#fff" />
      <Path d="M.745 0L21 13.535V15h-.728L0 1.45V0h.745z" fill="#F93939" />
      <Path fillRule="evenodd" clipRule="evenodd" d="M19 0h2v2.5S8.01 10.828 2 15H0v-2.5L19 0z" fill="#fff" />
      <Path d="M21 0h-.678L0 13.547V15h.745L21 1.462V0z" fill="#F93939" />
      <Path fillRule="evenodd" clipRule="evenodd" d="M7.637 0h5.743v4.627H21v5.743h-7.62V15H7.637v-4.63H0V4.627h7.637V0z" fill="#fff" />
      <Path fillRule="evenodd" clipRule="evenodd" d="M8.842 0h3.316v5.77H21v3.46h-8.842V15H8.842V9.23H0V5.77h8.842V0z" fill="#F93939" />
    </Svg>
  );
}

export { EN };
