import React from 'react';
import { View, ViewProps } from 'react-native';

import styles from '../../style';
import { useTheme } from '@theme/index';
import { useStyle } from '@library/hooks';

import ScreenInset from '../inset';

import type { ScreenComponentProps } from '../../type';
import type { SafeAreaViewProps } from 'react-native-safe-area-context';

function ScreenWithoutScrolling(Wrapper: React.ComponentType<ViewProps | SafeAreaViewProps>, props: ScreenComponentProps) {
  const S = useStyle(styles);
  const { colors } = useTheme();

  const {
    statusBarStyle,
    bg,
    actualUnsafe,
    children,
    edges,
    hiddenStatusBar = false,
    statusColor = undefined,
    bottomInsetColor = 'background',
    style = {},
    rightInsetColor = 'background',
    leftInsetColor = 'background',
  } = props;

  return (
    <>
      <Wrapper edges={edges} style={[S.inner, style, bg ? { backgroundColor: colors[bg] } : {}]}>
        <View style={[S.flex]} children={children} />
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

export default ScreenWithoutScrolling;
