import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const ChevronUp: React.FC<SvgProps> = ({ color = '#848A8F', ...props }) => {
  return (
    <Svg width={16} height={10} viewBox="0 0 16 10" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.536 6.864l-6.4-6.4A1.595 1.595 0 008 0c-.448 0-.848.176-1.136.464l-6.4 6.4a1.605 1.605 0 002.272 2.272L8 3.856l5.264 5.264c.288.304.688.48 1.136.48a1.605 1.605 0 001.136-2.736z"
        fill={color}
      />
    </Svg>
  );
};

export { ChevronUp };
