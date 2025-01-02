import React from 'react';

import { useAppStore } from '@store/app';
import { Divider } from '@components/ui/divider';

import { OutlinedButton, Screen } from '@components/common';
import { AccountDetails, SubscriptionDetails } from './parts';

import { useMe } from '@services/me';
import { phoneNumberService } from '@services/phone-number';
import { useCurrentCca2 } from '@library/hooks';

interface IMyAccountModule {
  loading?: boolean;
  onRefresh?(): void;
  onRemoveAccount(): void;
  onChangePassword(): void;
  onHandleSubscription(): void;
}

const MyAccountModule: React.FC<IMyAccountModule> = props => {
  const { onRemoveAccount, onChangePassword, loading, onHandleSubscription } = props;
  const { cca2 } = useCurrentCca2();
  const { getMe, loading: loadingMe, me } = useMe();
  const { fullPattern } = phoneNumberService.createPhoneUtil(cca2);

  const email = me?.contactData?.find(contact => contact.type === 'EMAIL')?.value;
  const phone = me?.contactData?.find(contact => contact.type === 'PHONE')?.value;
  const formattedPhone = phone ? phoneNumberService.fullPhoneNumberFormatter(fullPattern, phone) : 'N/A';

  return (
    <Screen scroll unsafe loading={loading || loadingMe} onRefresh={getMe} style={{ paddingHorizontal: 0 }}>
      <AccountDetails email={email} phone={formattedPhone} onChangePassword={onChangePassword} onRefresh={getMe} />
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
