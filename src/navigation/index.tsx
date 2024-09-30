import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './core';
import { useLocaleService } from '@services/locale';
import { Loader } from '@components/ui';
import { useDeepLinks } from '@library/hooks';
import { PinScreen } from '@screens/pin-screen';
import { useAppStore } from '@store/app';
import { usePinCodeStore } from '@store/pin-code';

const ApplicationNavigator = () => {
  useLocaleService(true);
  const { linking } = useDeepLinks();
  const visible = usePinCodeStore(state => state.visible);
  const isAuthenticated = useAppStore(state => state.isAuthenticated);

  return (
    <NavigationContainer linking={linking} fallback={<Loader />}>
      <RootNavigator />
      {isAuthenticated && visible && <PinScreen />}
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
