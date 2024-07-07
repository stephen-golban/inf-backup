import React from 'react';

import { BaseButton, type ButtonProps } from '../base';

const OutlinedButton: React.FC<ButtonProps> = props => {
  return (
    <BaseButton
      direction="row"
      justify="center"
      align="center"
      bg="transparent"
      br={8}
      minh={48}
      px="md"
      bw={1}
      bc="blue"
      textColor="blue"
      loaderColor="blue"
      {...props}
    />
  );
};

export { OutlinedButton };
