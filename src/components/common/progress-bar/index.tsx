import React from 'react';

import { Color } from '@theme/colors';

import { View, ViewProps } from '../view';

interface IProgressBarProps extends ViewProps {
  bg?: Color;
  color?: Color;
  progress: number;
}

const ProgressBar: React.FC<IProgressBarProps> = props => {
  const { progress = 20, bg = 'mediumGray', color = 'lightBlue', ...rest } = props;

  return (
    <View fill row center {...rest}>
      <View fill h={8} w="100%" bg={bg} br={50}>
        <View h={8} w={`${progress}%`} bg={color} br={50} />
      </View>
    </View>
  );
};

export { ProgressBar };
