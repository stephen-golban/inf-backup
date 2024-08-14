import React from 'react';
import { Icon, Screen, Text, View } from '@components/common';

interface IRemoveModule {
  isAvailableSubscription?: boolean;
  onRemove(): void;
}

const RemoveModule: React.FC<IRemoveModule> = props => {
  const { isAvailableSubscription, onRemove } = props;
  return (
    <View fill bg="white">
      <View pt="zero" px="lg">
        <View center>
          <Icon icon="RemoveAccount" center w={150} h={150} br={999} />
          <Text t18n="logged_in:feedback:delete_account_warning" variant="12-reg" center lineHeight={18} />
          <Text center my="md" color="blue" t18n="logged_in:feedback:action_final" variant="10-reg" onPress={onRemove} />
        </View>
      </View>
      {isAvailableSubscription && (
        <View btw={1} bbw={1} py="sm" bg="lightBlue" row center g="xs">
          <Icon icon="DangerIcon" />
          <Text t18n="logged_in:feedback:cancel_before_delete" variant="10-reg" center />
        </View>
      )}
    </View>
  );
};

export { RemoveModule };
