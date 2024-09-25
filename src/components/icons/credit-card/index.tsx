import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const CreditCardIcon: React.FC<SvgProps> = ({ color, ...props }) => {
  return (
    <Svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
      />
    </Svg>
  );
};

export { CreditCardIcon };
