import * as React from 'react';
import Svg, { Defs, G, Path, Rect, type SvgProps } from 'react-native-svg';

const StarOutlinedIcon: React.FC<SvgProps> = ({ color = '#fff', strokeWidth = 2, ...props }) => {
  return (
    <Svg viewBox="0 0 32 32" width={32} height={32} fill="none" {...props}>
      <G opacity="100%">
        <Rect width={32} height={32} fill="#fc0" rx={16} />
        <Svg height={14} width={14} viewBox="0 0 24 24" fill="#000" x={9} y={9} {...props}>
          <Path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
        </Svg>
      </G>
      <Defs></Defs>
    </Svg>
  );
};

export { StarOutlinedIcon };
