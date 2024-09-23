import React from 'react';

import { View } from '@components/common/view';

import type { InsetProps } from '../../type';

const InsetPiece: React.FC<InsetProps> = ({ color, height, width, bottom, left, right, top }: InsetProps) => {
  return <View bg={color} h={height} w={width} bottom={bottom} left={left} right={right} top={top} fill absolute />;
};

export default InsetPiece;
