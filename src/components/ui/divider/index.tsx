import React from 'react';

import { View, type ViewProps } from '@components/common';

interface IDivider extends ViewProps {
  isHorizontal?: boolean;
}

const Divider: React.FC<IDivider> = ({
  isHorizontal,
  bg = 'gray_80',
  h = isHorizontal ? 0.5 : '100%',
  w = isHorizontal ? '100%' : 2,
  ...rest
}) => {
  const base_props: ViewProps = {
    bg,
  };
  if (isHorizontal) {
    return <View h={h || 2} w={w} bg={bg} {...rest} />;
  }
  return <View h={h} w={w} bg={bg} {...rest} />;
};

export { Divider };
