import * as React from 'react';
import Svg, { Defs, G, Path, Rect, type SvgProps } from 'react-native-svg';

const SquareShareIcon: React.FC<SvgProps> = ({ color = '#fff', strokeWidth = 2, ...props }) => {
  return (
    <Svg viewBox="0 0 28 28" width={28} height={28} fill="none" {...props}>
      <G opacity="100%">
        <Rect width={28} height={28} fill="#065fe0" rx={14} />
        <Svg viewBox="0 0 448 512" width={14} height={14} fill="#fff" x={7} y={7} {...props}>
          <Path d="M384 32c35.3 0 64 28.65 64 64v320c0 35.3-28.7 64-64 64H64c-35.35 0-64-28.7-64-64V96c0-35.35 28.65-64 64-64h320zm-64 64c-35.3 0-64 28.7-64 64 0 2.5.1 4.9.4 7.3L174.5 212c-11.7-12.3-28.2-20-46.5-20-35.35 0-64 28.7-64 64s28.65 64 64 64c18.3 0 34.8-7.7 46.5-20.9l81.9 45.6c-.3 2.4-.4 4.8-.4 7.3 0 35.3 28.7 64 64 64s64-28.7 64-64-28.7-64-64-64c-15.4 0-29.5 5.4-40.6 14.5L194.1 256l85.3-46.5c11.1 9.1 25.2 14.5 40.6 14.5 35.3 0 64-28.7 64-64s-28.7-64-64-64z" />
        </Svg>
      </G>
      <Defs></Defs>
    </Svg>
  );
};

export { SquareShareIcon };
