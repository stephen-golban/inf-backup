import React from 'react';
import { FilledButton, Icon, Text, View } from '@components/common';

interface IExpiredRegisterModule {
  onPressRegister(): void;
}
const ExpiredRegisterModule: React.FC<IExpiredRegisterModule> = ({ onPressRegister }) => {
  return (
    <View mx="lg" fill center>
      <Icon icon="CheckErrorIcon" />
      <Text variant="32-bold" mt="md" textAlign="center" t18n="logged_out:register:expired_register" />
      <Text variant="24-bold" mt="md" textAlign="center" t18n="logged_out:register:expired_register_desc" />
      <FilledButton t18n="logged_out:register:page_title" bg="blue" mt="xl" onPress={onPressRegister} />
    </View>
  );
};

export { ExpiredRegisterModule };
