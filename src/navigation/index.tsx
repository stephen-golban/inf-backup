import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './core';
import { useLocaleService } from '@services/locale';
import { Loader } from '@components/ui';
import { useDeepLinks } from '@library/hooks';

const ApplicationNavigator = () => {
  useLocaleService(true);
  const { linking } = useDeepLinks();

  return (
    <NavigationContainer linking={linking} fallback={<Loader />}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
