import React from 'react';

import { useAppStore } from '@store/app';
import { useGoBack, useTranslation } from '@library/hooks';

import { Icon, Avatar, Image, Text, View } from '@components/common';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { LOGGED_IN_SCREENS, LOGGED_IN_STACK, PROFILE_SCREENS } from '@typings/navigation';

const Header: React.FC<NativeStackHeaderProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const user = useAppStore(state => state.user);
  const { showGoBack = true, goBack = navigation.goBack } = useGoBack();

  const isBackButtonVisible = showGoBack && navigation.canGoBack();

  const photoUri = user?.photo ? `data:image/jpeg;base64,${user.photo}` : undefined;

  const onPressAvatar = () => {
    navigation.navigate(LOGGED_IN_STACK.SCREENS, {
      screen: LOGGED_IN_SCREENS.PROFILE,
      params: { screen: PROFILE_SCREENS.SECTIONS },
    });
  };

  return (
    <View px="md" py="xs" bg="white" row between align="center">
      {isBackButtonVisible && <Icon icon="ArrowNarrowLeft" color="black" onPress={goBack} />}
      {isBackButtonVisible ? (
        <Image source={require('@assets/images/infodebit.png')} h={35} resizeMode="contain" />
      ) : (
        <Text variant="14-reg" text={t('logged_in:home:welcome', { firstName: user?.firstName })}>
          {user?.firstName}!
        </Text>
      )}

      <Avatar.Image source={{ uri: photoUri }} size={35} onPress={onPressAvatar} bc="black" bw={1} />
    </View>
  );
};

export { Header };
