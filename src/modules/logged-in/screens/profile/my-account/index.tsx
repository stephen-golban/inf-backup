import React from 'react';

import { useAppStore } from '@store/app';
import { Divider } from '@components/ui/divider';

import { OutlinedButton, Screen } from '@components/common';
import { AccountDetails, SubscriptionDetails } from './parts';

import { formatPhoneNumber } from '@library/method';

interface IMyAccountModule {
  loading?: boolean;
  onRefresh?(): void;
  onRemoveAccount(): void;
  onChangePassword(): void;
  onHandleSubscription(): void;
}

const MyAccountModule: React.FC<IMyAccountModule> = props => {
  const { onRemoveAccount, onChangePassword, loading, onRefresh, onHandleSubscription } = props;

  const user = useAppStore(state => state.user);

  const email = user?.contactData?.find(contact => contact.type === 'EMAIL')?.value;
  const phone = user?.contactData?.find(contact => contact.type === 'PHONE')?.value;
  const formattedPhone = phone ? formatPhoneNumber(phone, true) : 'N/A';

  return (
    <Screen scroll unsafe loading={loading} onRefresh={onRefresh} style={{ paddingHorizontal: 0 }}>
      <AccountDetails email={email} phone={formattedPhone} onChangePassword={onChangePassword} />
      <SubscriptionDetails onChangeSubscription={onHandleSubscription} />
      <Divider isHorizontal bg="blue" h={1.2} mt="xxxl" />
      <OutlinedButton
        mt="xl"
        t18n="profile:my_account:remove_account"
        mx="xxl"
        textProps={{ variant: '14-reg' }}
        onPress={onRemoveAccount}
      />
    </Screen>
  );
};

export { MyAccountModule };
