import * as React from 'react';
import Svg, { G, Path, Rect, type SvgProps } from 'react-native-svg';

const FavoriteIcon: React.FC<SvgProps> = ({ color = '#fff', strokeWidth = 2, ...props }) => {
  return (
    <Svg viewBox="0 0 28 28" width={28} height={28} fill="none" {...props}>
      <Rect x={2} y={2} width={34} height={34} fill="#065fe0" rx={20} />
      <G x={7} y={7}>
        <Path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#fff"
        />
      </G>
    </Svg>
  );
};

export { FavoriteIcon };
