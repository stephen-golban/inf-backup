import * as React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

export const FocusAwareStatusBar = ({ barStyle = 'dark-content', ...props }: StatusBarProps) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar barStyle={barStyle} {...props} /> : null;
};
