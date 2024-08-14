import React from 'react';

import { View } from '../view';
import { SafeAreaView } from '../safe-area-view';
import ScreenWithScrolling from './parts/with-scrolling';
import { ActivityIndicator } from '../activity-indicator';
import ScreenWithoutScrolling from './parts/without-scrolling';

import { getEdges } from './util';

import type { ScreenProps } from './type';
import { type Edge } from 'react-native-safe-area-context';

const Screen: React.FC<ScreenProps> = ({ loading, ...props }) => {
  const edges = React.useMemo<Edge[]>(() => {
    return getEdges(props.excludeEdges, props?.hiddenStatusBar || false);
  }, [props.excludeEdges, props.hiddenStatusBar]);

  const actualUnsafe = React.useMemo<boolean>(() => props.unsafe || edges.length <= 0, [edges.length, props.unsafe]);

  const Wrapper = actualUnsafe ? View : SafeAreaView;

  if (loading) {
    return (
      <View fill center {...props}>
        <ActivityIndicator color="blue" />
      </View>
    );
  }

  if (props.scroll) {
    return ScreenWithScrolling(Wrapper, { ...props, actualUnsafe, edges });
  }

  return ScreenWithoutScrolling(Wrapper, { ...props, actualUnsafe, edges });
};

export { Screen, type ScreenProps };
