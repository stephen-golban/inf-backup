import React from 'react';

import { useAppStore } from '@store/app';
import { useGoBack } from '@library/hooks';

import { Avatar } from '@components/common/avatar';
import { Icon, Image, View } from '@components/common';

import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

const Header: React.FC<BottomTabHeaderProps> = ({ navigation }) => {
  const { showGoBack = true, goBack = navigation.goBack } = useGoBack();

  const user = useAppStore(state => state.user);

  const isBackButtonVisible = showGoBack && navigation.canGoBack();

  return (
    <View px="md" bg="lightGray" row between align="center">
      {isBackButtonVisible && <Icon icon="ChevronLeft" color="black" onPress={goBack} />}

      <Image resizeMode="contain" style={{ height: 70, aspectRatio: 2 / 1.3 }} source={require('@assets/images/infodebit.png')} />
      <Avatar.Image source={{ uri: user?.photo }} size={35} />
    </View>
  );
};

export { Header };
