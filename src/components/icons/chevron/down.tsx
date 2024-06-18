import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const ChevronDown: React.FC<SvgProps> = ({ color = '#848A8F', ...props }) => {
  return (
    <Svg width={16} height={10} viewBox="0 0 16 10" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.536 2.736l-6.4 6.4A1.595 1.595 0 018 9.6c-.448 0-.848-.176-1.136-.464l-6.4-6.4A1.605 1.605 0 012.736.464L8 5.744 13.264.48C13.552.176 13.952 0 14.4 0a1.605 1.605 0 011.136 2.736z"
        fill={color}
      />
    </Svg>
  );
};

export { ChevronDown };
