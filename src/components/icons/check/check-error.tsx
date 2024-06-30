import React from 'react';
import Svg, { Defs, G, Path, type SvgProps } from 'react-native-svg';

const CheckErrorIcon: React.FC<SvgProps> = props => {
  const { color = '#000000', width = 160, height = 160, ...rest } = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 256 256" {...rest}>
      <Defs />
      <G transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
        <Path
          fill={color}
          d="M 28.5 65.5 c -1.024 0 -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 l 33 -33 c 1.561 -1.562 4.096 -1.562 5.656 0 c 1.563 1.563 1.563 4.095 0 5.657 l -33 33 C 30.547 65.109 29.524 65.5 28.5 65.5 z"
        />
        <Path
          fill={color}
          d="M 61.5 65.5 c -1.023 0 -2.048 -0.391 -2.828 -1.172 l -33 -33 c -1.562 -1.563 -1.562 -4.095 0 -5.657 c 1.563 -1.562 4.095 -1.562 5.657 0 l 33 33 c 1.563 1.562 1.563 4.095 0 5.656 C 63.548 65.109 62.523 65.5 61.5 65.5 z"
        />
        <Path
          fill={color}
          d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 8 C 24.598 8 8 24.598 8 45 c 0 20.402 16.598 37 37 37 c 20.402 0 37 -16.598 37 -37 C 82 24.598 65.402 8 45 8 z"
        />
      </G>
    </Svg>
  );
};

export { CheckErrorIcon };
