import React from 'react';
import { useNetworkStatus } from '@library/hooks';
import { Screen, Text, View, FilledButton, Icon } from '@components/common';

const NoNetworkScreen = () => {
  const [, checkConnection] = useNetworkStatus();

  return (
    <Screen bg="blue" fill absoluteFill statusBarStyle="light-content" loaderColor="white">
      <View fill center p="lg">
        <Icon icon="ConnectedWorldIcon" size={200} />
        <Text color="white" t18n="ui:toasts:no_internet_connection" variant="24-bold" textAlign="center" my="lg" />
        <Text color="white" variant="16-reg" textAlign="center" t18n="ui:check_internet_connection" mb="xl" />
        <FilledButton bg="white" px="xxxl" textColor="black" t18n="ui:retry" onPress={checkConnection} />
      </View>
    </Screen>
  );
};

export default NoNetworkScreen;
