import React from 'react';

import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import InsetPiece from './Inset.Piece';
import { FocusAwareStatusBar } from '@components/common/focus-aware-status-bar';

import type { InsetComponentProps } from '../../type';

const ScreenInset: React.FC<InsetComponentProps> = props => {
  const { edges, bottomInsetColor, hiddenStatusBar, leftInsetColor, rightInsetColor, statusColor, unsafe, statusBarStyle } = props;
  const inset = useSafeAreaInsets();

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  return (
    <>
      <FocusAwareStatusBar
        translucent
        hidden={hiddenStatusBar}
        backgroundColor={'transparent'}
        barStyle={statusBarStyle || 'dark-content'}
      />
      {!unsafe && edges.includes('top') && <InsetPiece color={statusColor} top={0} height={inset.top} width={screenWidth} />}
      {!unsafe && edges.includes('left') && <InsetPiece color={leftInsetColor} left={0} height={screenHeight} width={inset.left} />}
      {!unsafe && edges.includes('right') && <InsetPiece color={rightInsetColor} right={0} height={screenHeight} width={inset.right} />}
      {!unsafe && edges.includes('bottom') && <InsetPiece color={bottomInsetColor} bottom={0} height={inset.bottom} width={screenWidth} />}
    </>
  );
};

export default ScreenInset;
