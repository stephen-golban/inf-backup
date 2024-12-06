import React from 'react';
import { FilledButton, Icon, Screen, Text, View } from '@components/common';

interface ISuccessRecognitionModule {
  onPressContinue: () => void;
}

const SuccessRecognitionModule: React.FC<ISuccessRecognitionModule> = ({ onPressContinue }) => {
  return (
    <Screen p="md" unsafe fill bg="white">
      <View fill align="center">
        <Icon icon="InfoDebitLogoIcon" center mt="xl" />
        <View my="lg">
          <Icon icon="SuccessRecognition" center />
        </View>
        <Text variant="18-bold" color="blue" my="lg" center t18n="logged_out:success-recognition:account_created_successfully" />
        <Text color="gray" variant="14-reg" lineHeight={30} center t18n="logged_out:success-recognition:data_validation_message" />
        <Text color="gray" variant="14-reg" lineHeight={30} center mt="lg" t18n="logged_out:success-recognition:out_of_hours_message" />
      </View>
      <View pb="xl">
        <FilledButton onPress={onPressContinue} textProps={{ variant: '14-bold' }} t18n="logged_out:success-recognition:insert_code" />
      </View>
    </Screen>
  );
};

export { SuccessRecognitionModule };
