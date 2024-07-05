import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

const PlusIcon: React.FC<SvgProps> = ({ color = '#fff', strokeWidth = 2, ...props }) => {
  return (
    <Svg viewBox="0 0 24 24" fill={color} {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </Svg>
  );
};

export { PlusIcon };
