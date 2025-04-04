import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const FileIcon: React.FC<SvgProps> = ({ color = 'white', ...props }) => {
  return (
    <Svg
      style={{
        width: 24,
        height: 24,
      }}
      viewBox="0 0 384 512"
      fill={color}
      {...props}>
      <Path d="M256 0v128h128L256 0zm32 256H96v64h192v-64zm-64-128V0H48C21.49 0 0 21.49 0 48v416c0 26.5 21.49 48 48 48h288c26.51 0 48-21.49 48-48V160H256.9c-18.6 0-32.9-14.3-32.9-32zM64 72c0-4.37 3.63-8 8-8h80c4.4 0 8 3.63 8 8v16c0 4.38-3.6 8-8 8H72c-4.37 0-8-3.62-8-8V72zm0 64c0-4.4 3.63-8 8-8h80c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H72c-4.37 0-8-3.6-8-8v-16zm256 304c0 4.375-3.625 8-8 8h-80c-4.4 0-8-3.6-8-8v-16c0-4.375 3.625-8 8-8h80c4.375 0 8 3.625 8 8v16zm0-200v96c0 8.875-7.125 16-16 16H80c-8.87 0-16-7.1-16-16v-96c0-8.9 7.13-16 16-16h224c8.9 0 16 7.1 16 16z" />
    </Svg>
  );
};

export { FileIcon };
