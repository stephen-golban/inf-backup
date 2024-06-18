import React from 'react';
import { ViewProps } from 'react-native';

import styles from '../../style';
import { useTheme } from '@theme/index';
import { useStyle } from '@library/hooks';

import ScreenInset from '../inset';
import Animated from 'react-native-reanimated';

import type { ScreenComponentProps } from '../../type';
import type { SafeAreaViewProps } from 'react-native-safe-area-context';

function ScreenWithScrolling(Wrapper: React.ComponentType<ViewProps | SafeAreaViewProps>, props: ScreenComponentProps) {
  const S = useStyle(styles);
  const { colors } = useTheme();

  const {
    statusBarStyle,
    bg,
    actualUnsafe,
    children,
    onScroll,
    edges,
    hiddenStatusBar = false,
    statusColor = undefined,
    bottomInsetColor = 'background',
    style = {},
    leftInsetColor = 'background',
    rightInsetColor = 'background',
  } = props;

  return (
    <>
      <Wrapper edges={edges} style={[S.outer]}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          overScrollMode={'never'}
          style={[S.inner, bg ? { backgroundColor: colors[bg] } : {}]}
          contentContainerStyle={[style]}
          children={children}
        />
      </Wrapper>
      <ScreenInset
        edges={edges}
        bottomInsetColor={bottomInsetColor}
        statusColor={statusColor}
        statusBarStyle={statusBarStyle}
        hiddenStatusBar={hiddenStatusBar}
        leftInsetColor={leftInsetColor}
        rightInsetColor={rightInsetColor}
        unsafe={actualUnsafe}
      />
    </>
  );
}

export default ScreenWithScrolling;
