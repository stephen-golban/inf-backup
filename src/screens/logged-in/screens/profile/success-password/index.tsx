import React from 'react';
import { FilledButton, Icon, Screen, Text, View } from '@components/common';
import { PROFILE_SCREENS, ProfileStackScreenProps } from '@typings/navigation';

const SuccessPasswordScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.SUCCESS_PASSWORD>> = ({ navigation }) => {
  return (
    <Screen p="md" unsafe fill bg="white">
      <View fill center justify="center" flex={1}>
        <Text variant="20-semi" color="blue" textAlign="center" my="xl" t18n="validation:password:success_password" />

        <View fill center justify="center">
          <Icon icon="CheckCircleIcon" size={300} color="forestGreen" />
        </View>
      </View>
      <View justify="flex-end" pb="xl">
        <FilledButton t18n="ui:continue" bg="blue" mt="xl" onPress={() => navigation.navigate(PROFILE_SCREENS.MY_ACCOUNT)} />
      </View>
    </Screen>
  );
};

export { SuccessPasswordScreen };
