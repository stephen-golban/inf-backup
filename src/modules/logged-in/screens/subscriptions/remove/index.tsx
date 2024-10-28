import React from 'react';
import { Icon, OutlinedButton, Text, View } from '@components/common';
import { Alert } from 'react-native';
import { useTranslation } from '@library/hooks';

interface IRemoveModule {
  onRemove(): void;
  loading?: boolean;
  isAvailableSubscription?: boolean;
}

const RemoveModule: React.FC<IRemoveModule> = ({ isAvailableSubscription, loading, onRemove }) => {
  const { t } = useTranslation();
  const handleRemovePress = () => {
    Alert.alert(
      t('ui:confirmation'),
      t('ui:are_you_sure'),
      [
        {
          text: t('ui:cancel'),
          style: 'cancel',
        },
        {
          text: t('ui:ok'),
          onPress: onRemove,
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View fill bg="white" between pb="xl">
      <View pt="zero" px="lg">
        <View center>
          <Icon icon="RemoveAccount" center w={150} h={150} br={999} />
          <Text t18n="logged_in:feedback:delete_account_warning" variant="12-reg" center lineHeight={18} />
          <Text center my="md" color="blue" t18n="logged_in:feedback:action_final" variant="10-reg" />
        </View>
      </View>
      {isAvailableSubscription ? (
        <View btw={1} bbw={1} py="sm" bg="lightBlue" row center g="xs">
          <Icon icon="DangerIcon" />
          <Text t18n="logged_in:feedback:cancel_before_delete" variant="10-reg" center />
        </View>
      ) : (
        <OutlinedButton bc="error" textColor="error" t18n="ui:continue" loading={loading} onPress={handleRemovePress} mx="lg" mb="md" />
      )}
    </View>
  );
};

export { RemoveModule };
