import React from 'react';
import { OutlinedButton, Text, View } from '@components/common';
import { PhoneOrEmailModule } from '@modules/modals';

interface IAccountDetails {
  email?: string;
  phone?: string;
  onChangePassword(): void;
  onRefresh?(): void;
}

const AccountDetails: React.FC<IAccountDetails> = props => {
  const { email, phone, onChangePassword, onRefresh } = props;
  return (
    <View my="sm">
      <Text px="md" variant="16-reg" t18n="profile:my_account:account_details:title" />
      <View my="md" bg="lightBlue" btw={1.2} bbw={1.2} bc="blue">
        <View p="md" bbw={1.2} bc="blue" row between>
          <Text variant="14-reg" t18n="profile:my_account:account_details:email" />
          <Text variant="14-reg" textDecorationLine="underline">
            {email || <PhoneOrEmailModule type="EMAIL" onSuccess={() => onRefresh?.()} />}
          </Text>
        </View>
        <View p="md" row between>
          <Text variant="14-reg" t18n="profile:my_account:account_details:phone" />
          <Text variant="14-reg">{phone || <PhoneOrEmailModule type="PHONE" onSuccess={() => onRefresh?.()} />}</Text>
        </View>
      </View>
      <OutlinedButton
        onPress={onChangePassword}
        t18n="profile:my_account:account_details:change_password"
        mx="xxl"
        textProps={{ variant: '14-reg' }}
      />
    </View>
  );
};

export { AccountDetails };
