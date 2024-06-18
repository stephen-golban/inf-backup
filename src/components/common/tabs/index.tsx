import React from 'react';

import { useTabs } from './hooks';

import { View } from '@components/common/view';
import Animated from 'react-native-reanimated';
import { TabsItem, TabsContent } from './parts';

import type { TabsProps } from './type';
import type { LayoutChangeEvent } from 'react-native';

const AnimatedView = Animated.createAnimatedComponent(View);

type ExtendedTabs = React.FC<TabsProps> & { Item: typeof TabsItem; Content: typeof TabsContent };

const Tabs: ExtendedTabs = ({ children, defaultSelectedTab, justify = 'flex-start', tabSpace = 'lg', fill = true, onTabsPress, mt }) => {
  const { handleTabPress, onTabLayout, underlineStyle, activeIndex } = useTabs({ children, defaultSelectedTab });

  React.useEffect(() => {
    if (onTabsPress) {
      onTabsPress(activeIndex);
    }
  }, [activeIndex]);

  return (
    <View fill={fill} mt={mt}>
      <View direction="row" justify={justify} align="center" cg={justify.startsWith('space') ? undefined : tabSpace} flexWrap="wrap">
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            onPress: () => handleTabPress(index),
            onLayout: (event: LayoutChangeEvent) => onTabLayout(event, index),
          }),
        )}
        <AnimatedView h={3} bg="blue" position="absolute" bottom={3} style={[underlineStyle]} />
      </View>
      {React.isValidElement(children[activeIndex]) && children[activeIndex].props.children}
    </View>
  );
};

Tabs.Item = TabsItem;
Tabs.Content = TabsContent;

export { Tabs };
