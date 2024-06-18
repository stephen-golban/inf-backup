import React from 'react';
import { View } from 'react-native';

import ScreenWithScrolling from './parts/with-scrolling';
import ScreenWithoutScrolling from './parts/without-scrolling';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { getEdges } from './util';

import type { ScreenProps } from './type';

export const Screen = (props: ScreenProps) => {
  const edges = React.useMemo<Edge[]>(() => {
    return getEdges(props.excludeEdges, props?.hiddenStatusBar ?? false);
  }, [props.excludeEdges, props.hiddenStatusBar]);

  const actualUnsafe = React.useMemo<boolean>(() => props.unsafe || edges.length <= 0, [edges.length, props.unsafe]);

  const Wrapper = React.useMemo(() => (actualUnsafe ? View : SafeAreaView), [actualUnsafe]);

  if (props.scroll) {
    return ScreenWithScrolling(Wrapper, { ...props, actualUnsafe, edges });
  } else {
    return ScreenWithoutScrolling(Wrapper, { ...props, actualUnsafe, edges });
  }
};
