import React from 'react';

import { isIos } from '@library/method';

import AppBarButton from './parts/AppBar.Button';
import { IconType, View } from '@components/common';

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const TAB_ICONS = {
  HOME: 'HomeIcon',
  Plus: 'PlusIcon',
  Like: 'LikeIcon',
};

const HEIGHT_APP_BAR = isIos ? 70 : 60;
const PADDING_BOTTOM_APP_BAR = isIos ? 'md' : 'xs';

const AppBar: React.FC<BottomTabBarProps> = props => {
  const { state, navigation } = props;

  return (
    <View row around bg="blue" align="center" h={HEIGHT_APP_BAR} pb={PADDING_BOTTOM_APP_BAR}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;

        const icon = TAB_ICONS[route.name as keyof typeof TAB_ICONS];

        return <AppBarButton key={route.key} focused={focused} icon={icon as IconType} navigation={navigation} name={route.name} />;
      })}
    </View>
  );
};

export { AppBar };
