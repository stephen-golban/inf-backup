import React from 'react';

import RootNavigator from './core';
import { NavigationContainer } from '@react-navigation/native';

const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
