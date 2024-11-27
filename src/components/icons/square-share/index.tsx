import * as React from 'react';
import Svg, { Circle, Defs, G, Path, Rect, type SvgProps } from 'react-native-svg';

const SquareShareIcon: React.FC<SvgProps> = ({ color = '#fff', strokeWidth = 2, ...props }) => {
  return (
    <Svg width={28} height={28} viewBox="0 0 64 64" fill="none" {...props}>
      <Circle cx={32} cy={32} r={32} fill="#007BFF" />
      <Rect x={20} y={20} width={24} height={24} rx={4} fill="#fff" />
      <Circle cx={36} cy={26} r={3} fill="#007BFF" />
      <Circle cx={28} cy={32} r={3} fill="#007BFF" />
      <Circle cx={36} cy={38} r={3} fill="#007BFF" />
      <Path
        d="M33.657 27.657l-4.314 2.686m0 3.314l4.314 2.686"
        stroke="#007BFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export { SquareShareIcon };
