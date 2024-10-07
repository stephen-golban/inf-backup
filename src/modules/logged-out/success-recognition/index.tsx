import React from 'react';
import { FilledButton, Icon, Screen, Text, View } from '@components/common';

interface ISuccessRecognitionModule {
  onPressContinue: () => void;
}

const SuccessRecognitionModule: React.FC<ISuccessRecognitionModule> = ({ onPressContinue }) => {
  return (
    <Screen p="md" unsafe fill bg="white">
      <View fill center justify="center" flex={1}>
        <Text variant="20-semi" color="blue" textAlign="center" my="xl" t18n="logged_out:success-recognition:title" />

        <View fill center justify="center">
          <Icon icon="CheckCircleIcon" size={300} color="forestGreen" />
        </View>
        <Text variant="20-semi" color="blue" textAlign="center" lineHeight={30} t18n="logged_out:will_process_your_information" />
      </View>
      <View justify="flex-end" pb="xl">
        <FilledButton t18n="ui:continue" bg="blue" mt="xl" onPress={onPressContinue} />
      </View>
    </Screen>
  );
};

export { SuccessRecognitionModule };
