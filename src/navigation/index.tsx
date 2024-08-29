import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import RootNavigator from './core';
import { useLocaleService } from '@services/locale';
import useFirebaseNotifications from '@library/hooks/useFirebaseNotifications';

const ApplicationNavigator = () => {
  useLocaleService(true);
  const { linking } = useFirebaseNotifications();
  return (
    <NavigationContainer linking={linking} fallback={<ActivityIndicator animating />}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
