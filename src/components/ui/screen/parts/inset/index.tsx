import React from 'react';

import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import InsetPiece from './Inset.Piece';
import { FocusAwareStatusBar } from '@components/common';

import type { InsetComponentProps } from '../../type';
import { useTheme } from '@theme/index';

const ScreenInset: React.FC<InsetComponentProps> = props => {
  const { edges, bottomInsetColor, hiddenStatusBar, leftInsetColor, rightInsetColor, statusColor, unsafe, statusBarStyle } = props;
  const { colors } = useTheme();
  const inset = useSafeAreaInsets();

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  return (
    <>
      <FocusAwareStatusBar
        translucent
        hidden={hiddenStatusBar}
        backgroundColor={'transparent'}
        barStyle={statusBarStyle || 'light-content'}
      />
      {!unsafe && edges.includes('top') && <InsetPiece color={statusColor} top={0} height={inset.top} width={screenWidth} />}
      {!unsafe && edges.includes('left') && (
        <InsetPiece color={leftInsetColor ? colors[leftInsetColor] : undefined} left={0} height={screenHeight} width={inset.left} />
      )}
      {!unsafe && edges.includes('right') && (
        <InsetPiece color={rightInsetColor ? colors[rightInsetColor] : undefined} right={0} height={screenHeight} width={inset.right} />
      )}
      {!unsafe && edges.includes('bottom') && (
        <InsetPiece color={bottomInsetColor ? colors[bottomInsetColor] : undefined} bottom={0} height={inset.bottom} width={screenWidth} />
      )}
    </>
  );
};

export default ScreenInset;
