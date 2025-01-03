import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './core';
import { useLocaleService } from '@services/locale';
import { Loader } from '@components/ui';
import { useDeepLinks, useNetworkStatus } from '@library/hooks';
import { PinScreen } from '@screens/pin-screen';
import { useAppStore } from '@store/app';
import { usePinCodeStore } from '@store/pin-code';
import NoNetworkScreen from '@screens/no-network-screen';

const ApplicationNavigator = () => {
  useLocaleService(true);
  const { linking } = useDeepLinks();
  const [isConnected] = useNetworkStatus();
  const visible = usePinCodeStore(state => state.visible);
  const isAuthenticated = useAppStore(state => state.isAuthenticated);

  return (
    <NavigationContainer linking={linking} fallback={<Loader />}>
      {isConnected ? (
        <>
          <RootNavigator />
          {isAuthenticated && visible && <PinScreen />}
        </>
      ) : (
        <NoNetworkScreen />
      )}
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
