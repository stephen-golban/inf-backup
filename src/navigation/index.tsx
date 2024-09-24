import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './core';
import { useLocaleService } from '@services/locale';
import { Loader } from '@components/ui';

const ApplicationNavigator = () => {
  useLocaleService(true);
  return (
    <NavigationContainer fallback={<Loader />}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
