import React from 'react';
import { FilledButton, Icon, Screen, Text, View } from '@components/common';

interface IFailedRecognitionModule {
  onPressContinue: () => void;
}

const FailedRecognitionModule: React.FC<IFailedRecognitionModule> = ({ onPressContinue }) => {
  return (
    <Screen p="md" unsafe fill bg="white">
      <View fill center justify="center" flex={1}>
        <Text variant="20-semi" color="blue" textAlign="center" my="xl" t18n="logged_out:something-went-wrong" />

        <View fill center justify="center">
          <Icon icon="CheckErrorIcon" size={300} color="crimsonRed" />
        </View>
        <Text variant="20-semi" color="blue" textAlign="center" lineHeight={30} t18n="logged_out:please_review_your_information" />
      </View>
      <View justify="flex-end" pb="xl">
        <FilledButton t18n="ui:check_information" bg="blue" mt="xl" onPress={onPressContinue} />
      </View>
    </Screen>
  );
};

export { FailedRecognitionModule };
