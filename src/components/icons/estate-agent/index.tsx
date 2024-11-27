import * as React from 'react';
import Svg, { Circle, Defs, G, Path, Rect, type SvgProps } from 'react-native-svg';

const EstateAgentIcon: React.FC<SvgProps> = ({ color = '#fff', strokeWidth = 2, ...props }) => {
  return (
    <Svg width={28} height={28} viewBox="0 0 64 64" fill="none" {...props}>
      <Circle cx={32} cy={32} r={32} fill="#007BFF" />
      <Path d="M22 36h6v8h-6v-8zm8-8h4v16h-4V28zm6-8h6v24h-6V20zM20 44h24v2H20v-2z" fill="#fff" />
    </Svg>
  );
};

export { EstateAgentIcon };
