import React from 'react';

import RootNavigator from './core';
import { NavigationContainer } from '@react-navigation/native';
import { useLocaleService } from '@services/locale';

const ApplicationNavigator = () => {
  useLocaleService(true);

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
