import React from 'react';

import { useTheme } from '@theme/index';
import { useGoBack } from '@library/hooks';

import { Icon } from '@components/common';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

const LoggedOutHeader: React.FC<NativeStackHeaderProps> = ({ navigation }) => {
  const { spacing } = useTheme();

  const { showGoBack = true, goBack = navigation.goBack } = useGoBack();

  const isBackButtonVisible = showGoBack && navigation.canGoBack();

  if (!isBackButtonVisible) {
    return null;
  }

  return <Icon icon="ArrowNarrowLeft" absolute top={spacing.sm} left={spacing.md} size={30} onPress={goBack} />;
};

export { LoggedOutHeader };
