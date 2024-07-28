import React from 'react';

import { BaseButton, Icon, IconType, View } from '@components/common';

import type { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { type ParamListBase, type NavigationHelpers } from '@react-navigation/native';

export interface IAppBarButton {
  name: string;
  icon: IconType;
  focused: boolean;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

const AppBarButton: React.FC<IAppBarButton> = props => {
  const { name, focused, icon, navigation } = props;

  const onPress = () => {
    if (name === 'HomeTabStack') {
      return navigation.navigate('LoggedInStack', {
        screen: 'tabs',
        params: {
          screen: 'HomeTabStack',
          params: {
            screen: 'Home',
          },
        },
      });
    }

    return !focused && navigation.navigate(name);
  };

  return (
    <BaseButton onPress={onPress} center>
      <View w={40} h={40} center bbw={focused ? 1 : 0} bbc={focused ? 'white' : 'transparent'}>
        <Icon icon={icon} size={22} />
      </View>
    </BaseButton>
  );
};

export default React.memo(AppBarButton);
