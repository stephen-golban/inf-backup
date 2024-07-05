import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const EditIcon: React.FC<SvgProps> = ({ color = 'white', ...props }) => (
  <Svg height={24} width={24} fill="white" viewBox="0 0 24 24" {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </Svg>
);
export { EditIcon };
