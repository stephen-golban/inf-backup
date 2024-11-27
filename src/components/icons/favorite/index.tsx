import * as React from 'react';
import Svg, { Circle, G, Path, Rect, type SvgProps } from 'react-native-svg';

const FavoriteIcon: React.FC<SvgProps> = ({ color = '#fff', strokeWidth = 2, ...props }) => {
  return (
    <Svg width={28} height={28} viewBox="0 0 64 64" fill="none" {...props}>
      <Circle cx={32} cy={32} r={32} fill="#007BFF" />
      <Path
        d="M32 46c-.8 0-1.5-.2-2.2-.7-3.8-2.4-14.2-9.8-14.2-20.8 0-4.8 3.8-8.5 8.6-8.5 2.9 0 5.6 1.4 7 3.5 1.4-2.1 4.1-3.5 7-3.5 4.8 0 8.6 3.7 8.6 8.5 0 11-10.4 18.4-14.2 20.8-.7.5-1.4.7-1.4.7z"
        fill="#fff"
      />
    </Svg>
  );
};

export { FavoriteIcon };
