import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './core';
import { useLocaleService } from '@services/locale';
import useFirebaseNotifications from '@library/hooks/useFirebaseNotifications';
import { Loader } from '@components/ui';

const ApplicationNavigator = () => {
  useLocaleService(true);
  const { linking } = useFirebaseNotifications();
  return (
    <NavigationContainer linking={linking} fallback={<Loader />}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
