import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const ChevronLeft: React.FC<SvgProps> = ({ color = '#3B444D', ...props }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.864 4.464l-6.4 6.4A1.595 1.595 0 007 12c0 .448.176.848.464 1.136l6.4 6.4a1.605 1.605 0 002.272-2.272L10.856 12l5.264-5.264c.304-.288.48-.688.48-1.136a1.605 1.605 0 00-2.736-1.136z"
        fill={color}
      />
    </Svg>
  );
};

export { ChevronLeft };
