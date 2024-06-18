import React from 'react';

import { BaseButton, type ButtonProps } from '../base';

const FilledButton: React.FC<ButtonProps> = ({ bg = 'blue', ...props }) => {
  return <BaseButton row center bg={bg} br={999} h={48} px="sm" bw={1} bc={bg} textColor="white" {...props} />;
};

export { FilledButton };
