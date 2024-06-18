import { useEffect, useState } from 'react';

import { getDefaultTabIndex } from '../util';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { TabsProps } from '../type';
import type { LayoutChangeEvent, LayoutRectangle } from 'react-native';

function useTabs(props: Pick<TabsProps, 'children' | 'defaultSelectedTab'>) {
  const underlineX = useSharedValue(0);
  const underlineWidth = useSharedValue(0);
  const [tabLayouts, setTabLayouts] = useState<Array<LayoutRectangle>>([]);
  const [activeIndex, setActiveIndex] = useState(getDefaultTabIndex(props));

  useEffect(() => {
    if (tabLayouts[activeIndex]) {
      const targetLayout = tabLayouts[activeIndex];
      underlineX.value = withTiming(targetLayout.x);
      underlineWidth.value = withTiming(targetLayout.width);
    }
  }, [activeIndex, tabLayouts]);

  function handleTabPress(index: number) {
    setActiveIndex(index);
  }

  function onTabLayout(event: LayoutChangeEvent, index: number) {
    const layout = event.nativeEvent.layout;
    const updatedLayouts = [...tabLayouts];
    updatedLayouts[index] = layout;
    setTabLayouts(updatedLayouts);
  }

  const underlineStyle = useAnimatedStyle(() => {
    return {
      width: underlineWidth.value,
      transform: [{ translateX: underlineX.value }],
    };
  });

  return { handleTabPress, onTabLayout, underlineStyle, activeIndex };
}

export { useTabs };
