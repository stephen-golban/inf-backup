import React from 'react';
import { FilledButton, Icon, Screen, Text, View } from '@components/common';

interface ISuccessRegistrationModule {
  onPressContinue: () => void;
}

const SuccessRegistrationModule: React.FC<ISuccessRegistrationModule> = ({ onPressContinue }) => {
  return (
    <Screen p="md" unsafe fill bg="white">
      <View fill center justify="center" flex={1}>
        <Text variant="20-semi" color="blue" textAlign="center" mt="xl" t18n="logged_out:success-registration:title" />

        <View fill center justify="center">
          <Icon icon="CheckCircleOutlinedIcon" size={300} color="forestGreen" />
        </View>
        <Text
          variant="20-semi"
          color="blue"
          textAlign="center"
          lineHeight={30}
          t18n="logged_out:success-registration:account_has_been_created"
        />
      </View>
      <View justify="flex-end" pb="xl">
        <FilledButton t18n="ui:back_to_login" bg="blue" mt="xl" onPress={onPressContinue} />
      </View>
    </Screen>
  );
};

export { SuccessRegistrationModule };
