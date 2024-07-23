import React from 'react';
import { Image } from 'react-native';
import { FilledButton, Text, View } from '@components/common';

interface IFrequentlyQuestions {
  onPress(): void;
}

const FrequentlyQuestions: React.FC<IFrequentlyQuestions> = ({ onPress }) => {
  return (
    <View p="sm" bg="lightBlue">
      <View mx="lg">
        <View my="md" center>
          <Image source={require('@assets/images/faq-1.png')} resizeMode="contain" />
        </View>
        <Text variant="32-semi" t18n="profile:faq:frequently_questions" />
        <Text variant="14-reg" t18n="profile:faq:who_we_are" mt="md" />
        <Text my="md" t18n="profile:faq:about_infodebit" color="gray" variant="14-reg" textAlign="justify" lineHeight={20} />
        <FilledButton onPress={onPress} t18n="profile:faq:learn_more" br="sm" mb="lg" alignSelf="flex-start" px="md" />
      </View>
    </View>
  );
};

export { FrequentlyQuestions };
