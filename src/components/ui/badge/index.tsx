import React from 'react';

import { useBadgePlacement } from './hook';

import { Text, View } from '@components/common';

import type { BadgeProps } from './type';

const Badge: React.FC<BadgeProps> = ({
  rule,
  value,
  size = 20,
  textProps,
  offset = 8,
  br = 'huge',
  bg = 'blue',
  placement = 'top-right',
  ...props
}) => {
  const { position, fontSize } = useBadgePlacement(value, placement, size, offset);

  return (
    <View position="absolute" center p={3} bg={bg} br={br} w={size} h={size} {...position} zIndex="huge" {...props}>
      <Text variant="12-reg" color="white" fontSize={fontSize} {...textProps}>
        {rule ? rule(value) : value}
      </Text>
    </View>
  );
};

export { Badge, type BadgeProps };
