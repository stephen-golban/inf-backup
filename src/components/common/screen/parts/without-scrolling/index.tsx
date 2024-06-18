import React from 'react';

import ScreenInset from '../inset';
import { View, type ViewProps } from '@components/common/view';

import type { ScreenComponentProps } from '../../type';
import type { SafeAreaViewProps } from '@components/common/safe-area-view';

function ScreenWithoutScrolling(Wrapper: React.ComponentType<ViewProps | SafeAreaViewProps>, props: ScreenComponentProps) {
  const {
    edges,
    children,
    actualUnsafe,
    statusBarStyle,
    bg = 'transparent',
    leftInsetColor = bg,
    rightInsetColor = bg,
    bottomInsetColor = bg,
    hiddenStatusBar = false,
    statusColor = undefined,
    ...rest
  } = props;

  return (
    <>
      <Wrapper edges={edges} fill w="100%" bg={bg} {...rest}>
        <View fill children={children} />
      </Wrapper>
      <ScreenInset
        edges={edges}
        unsafe={actualUnsafe}
        statusColor={statusColor}
        leftInsetColor={leftInsetColor}
        statusBarStyle={statusBarStyle}
        rightInsetColor={rightInsetColor}
        hiddenStatusBar={hiddenStatusBar}
        bottomInsetColor={bottomInsetColor}
      />
    </>
  );
}

export default ScreenWithoutScrolling;
