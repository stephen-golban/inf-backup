import React from 'react';
import { Image } from 'react-native';
import { FilledButton, Text, View } from '@components/common';

interface ICreditHistory {
  onPress(): void;
}

const CreditHistory: React.FC<ICreditHistory> = ({ onPress }) => {
  return (
    <View p="sm" bg="white">
      <View mx="lg">
        <Text t18n="profile:faq:frequently_questions" variant="12-reg" my="lg" />
        <Text t18n="profile:faq:credit_history" variant="32-reg" />
        <Text t18n="profile:faq:credit_history_description" variant="14-reg" my="lg" lineHeight={20} color="gray" />
        <FilledButton t18n="profile:faq:read" br="sm" mb="lg" px="xl" alignSelf="flex-start" onPress={onPress} />
        <Image source={require('@assets/images/faq-2.png')} resizeMode="contain" />
        <Text t18n="profile:faq:credit_history_retention" variant="32-reg" my="lg" />
        <Text t18n="profile:faq:credit_history_retention_description" variant="14-reg" my="sm" lineHeight={20} color="gray" />
      </View>
    </View>
  );
};

export { CreditHistory };
