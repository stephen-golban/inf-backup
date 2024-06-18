import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Icon, View } from '@components/common';

const OnboardingHeader: React.FC<NativeStackHeaderProps> = ({ navigation }) => {
  if (!navigation.canGoBack()) {
    return null;
  }

  return (
    <View bg="primary" pl="md" py="sm">
      <Icon icon="ArrowNarrowLeft" color="white" onPress={navigation.goBack} />
    </View>
  );
};

export { OnboardingHeader };
