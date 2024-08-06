import * as React from 'react';
import Svg, { Defs, G, Path, Rect, type SvgProps } from 'react-native-svg';

const EstateAgentIcon: React.FC<SvgProps> = ({ color = '#fff', strokeWidth = 2, ...props }) => {
  return (
    <Svg viewBox="0 0 28 28" width={28} height={28} fill="none" {...props}>
      <G opacity="100%">
        <Rect width={28} height={28} fill="#065fe0" rx={14} />
        <Svg height={14} width={14} viewBox="0 0 24 24" fill="#fff" x={7} y={7} {...props}>
          <Path fill="none" d="M0 0h24v24H0z" />
          <Path d="M1 22h4V11H1v11zm19-5h-7l-2.09-.73.33-.94L13 16h2.82c.65 0 1.18-.53 1.18-1.18 0-.49-.31-.93-.77-1.11L8.97 11H7v9.02L14 22l8-3c-.01-1.1-.89-2-2-2zM14 1.5l-7 5V9h2l8.14 3.26C18.26 12.71 19 13.79 19 15h2V6.5l-7-5zm-.5 8.5h-1V9h1v1zm0-2h-1V7h1v1zm2 2h-1V9h1v1zm0-2h-1V7h1v1z" />
        </Svg>
      </G>
      <Defs></Defs>
    </Svg>
  );
};

export { EstateAgentIcon };
