import React from 'react';
import { View, ViewStyle } from 'react-native';

import styles from '../../style';
import { useStyle } from '@library/hooks';

import type { InsetProps } from '../../type';

const InsetPiece: React.FC<InsetProps> = ({ color, height, width, bottom, left, right, top }: InsetProps) => {
  const S = useStyle(styles);
  const style = React.useMemo<ViewStyle>(() => {
    return { backgroundColor: color, width, height, top, left, bottom, right };
  }, [bottom, color, height, left, right, top, width]);

  return <View style={[S.insets, style]} />;
};

export default InsetPiece;
