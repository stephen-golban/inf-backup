import React from 'react';
import { Image, Text, View } from '@components/common';

interface IFrequentlyQuestions {
  image: string;
  title: string;
}

const FrequentlyQuestions: React.FC<IFrequentlyQuestions> = ({ image, title }) => {
  return (
    <View p="sm" bg="lightBlue">
      <View mx="lg">
        <View my="md" center>
          <Image source={{ uri: 'data:image/jpeg;base64,' + image }} w="100%" h={200} br="lg" resizeMode="cover" />
        </View>
        <Text variant="32-semi" text={title} />
      </View>
    </View>
  );
};

export { FrequentlyQuestions };
