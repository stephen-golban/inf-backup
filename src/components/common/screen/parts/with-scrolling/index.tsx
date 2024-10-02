import React from 'react';
import { RefreshControl } from 'react-native';

import ScreenInset from '../inset';
import Animated from 'react-native-reanimated';
import { ScrollView } from '@components/common/scroll-view';

import type { ScreenComponentProps } from '../../type';
import type { ViewProps } from '@components/common/view';
import type { SafeAreaViewProps } from '@components/common/safe-area-view';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

function ScreenWithScrolling(Wrapper: React.ComponentType<ViewProps | SafeAreaViewProps>, props: ScreenComponentProps) {
  const {
    edges,
    style,
    onScroll,
    children,
    onRefresh,
    actualUnsafe,
    statusBarStyle,
    bg = 'transparent',
    leftInsetColor = bg,
    rightInsetColor = bg,
    bottomInsetColor = bg,
    removeInsets = false,
    hiddenStatusBar = false,
    statusColor = undefined,
    ...rest
  } = props;

  return (
    <>
      <Wrapper edges={edges} bg="transparent" fill justify="flex-start" {...rest}>
        <AnimatedScrollView
          fill
          bg={bg}
          w="100%"
          onScroll={onScroll}
          children={children}
          overScrollMode="never"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[{ paddingHorizontal: 16, paddingVertical: 24 }, style]}
          refreshControl={onRefresh ? <RefreshControl refreshing={false} onRefresh={onRefresh} /> : undefined}
        />
      </Wrapper>
      {!removeInsets && (
        <ScreenInset
          edges={edges}
          unsafe={actualUnsafe}
          statusColor={statusColor}
          statusBarStyle={statusBarStyle}
          leftInsetColor={leftInsetColor}
          hiddenStatusBar={hiddenStatusBar}
          rightInsetColor={rightInsetColor}
          bottomInsetColor={bottomInsetColor}
        />
      )}
    </>
  );
}

export default ScreenWithScrolling;
