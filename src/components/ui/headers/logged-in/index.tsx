import React from 'react';
import { useAppStore } from '@store/app';
import { useGoBack } from '@library/hooks';
import { Avatar } from '@components/common/avatar';
import { Icon, Text, View } from '@components/common';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

const Header: React.FC<NativeStackHeaderProps> = ({ navigation }) => {
  const { showGoBack = true, goBack = navigation.goBack } = useGoBack();
  const user = useAppStore(state => state.user);

  const isBackButtonVisible = showGoBack && navigation.canGoBack();

  const photoUri = user?.photo ? `data:image/jpeg;base64,${user.photo}` : undefined;

  return (
    <View px="md" py="xs" bg="white" row between align="center">
      {isBackButtonVisible && <Icon icon="ChevronLeft" color="black" onPress={goBack} />}
      <Text variant="14-reg">Bine ai venit, {user?.firstName}!</Text>
      {photoUri && <Avatar.Image source={{ uri: photoUri }} size={35} />}
    </View>
  );
};

export { Header };
