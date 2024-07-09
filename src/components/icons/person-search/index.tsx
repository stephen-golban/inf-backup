import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const PersonSearchIcon: React.FC<SvgProps> = ({ color = 'white', ...rest }) => {
  return (
    <Svg
      style={{
        width: 24,
        height: 24,
      }}
      viewBox="0 0 24 24"
      fill={color}
      {...rest}>
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path d="M10 4a4 4 0 100 8 4 4 0 100-8zm.35 10.01C7.62 13.91 2 15.27 2 18v2h9.54c-2.47-2.76-1.23-5.89-1.19-5.99zm9.08 4.01c.36-.59.57-1.28.57-2.02 0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4c.74 0 1.43-.22 2.02-.57L20.59 22 22 20.59l-2.57-2.57zM16 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </Svg>
  );
};

export { PersonSearchIcon };
