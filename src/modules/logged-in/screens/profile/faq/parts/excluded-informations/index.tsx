import React from 'react';
import { Image } from 'react-native';
import { OutlinedButton, Text, View } from '@components/common';

interface IExcludedInformations {
  onPress(): void;
}

const ExcludedInformations: React.FC<IExcludedInformations> = ({ onPress }) => {
  return (
    <View p="sm" bg="blue">
      <View mx="lg">
        <Text t18n="profile:faq:frequently_questions" variant="12-reg" my="lg" color="white" />
        <Text t18n="profile:faq:excluded_information" variant="24-reg" color="white" />
        <OutlinedButton
          onPress={onPress}
          t18n="profile:faq:see_answer"
          bc="white"
          textColor="white"
          my="md"
          px="xl"
          alignSelf="flex-start"
        />
        <View my="lg">
          <Image source={require('@assets/images/faq-3.png')} />
        </View>
      </View>
    </View>
  );
};

export { ExcludedInformations };
