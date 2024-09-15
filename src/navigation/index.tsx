import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import RootNavigator from './core';
import { useLocaleService } from '@services/locale';

const ApplicationNavigator = () => {
  useLocaleService(true);
  return (
    <NavigationContainer fallback={<ActivityIndicator animating />}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
