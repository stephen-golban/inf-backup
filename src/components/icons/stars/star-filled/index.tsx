import * as React from 'react';
import Svg, { Defs, G, Path, Rect, type SvgProps } from 'react-native-svg';

const StarFilledIcon: React.FC<SvgProps> = ({ color = '#fff', strokeWidth = 2, ...props }) => {
  return (
    <Svg viewBox="0 0 32 32" width={32} height={32} fill="none" {...props}>
      <G opacity="100%">
        <Rect width={32} height={32} fill="#fc0" rx={16} />
        <Svg height={14} width={14} viewBox="0 0 24 24" fill="#000" x={9} y={9} {...props}>
          <Path d="M0 0h24v24H0z" fill="none" />
          <Path d="M0 0h24v24H0z" fill="none" />
          <Path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </Svg>
      </G>
      <Defs></Defs>
    </Svg>
  );
};

export { StarFilledIcon };
