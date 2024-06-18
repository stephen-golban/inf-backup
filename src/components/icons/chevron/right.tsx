import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const ChevronRight: React.FC<SvgProps> = ({ color = '#3B444D', ...props }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.736 19.536l6.4-6.4c.288-.288.464-.688.464-1.136 0-.448-.176-.848-.464-1.136l-6.4-6.4a1.605 1.605 0 00-2.272 2.272L12.744 12 7.48 17.264c-.304.288-.48.688-.48 1.136a1.605 1.605 0 002.736 1.136z"
        fill={color}
      />
    </Svg>
  );
};

export { ChevronRight };
