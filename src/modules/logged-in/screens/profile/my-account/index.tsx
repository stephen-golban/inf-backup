import React from 'react';

import { useTheme } from '@theme/index';
import { useAppStore } from '@store/app';
import { Divider } from '@components/ui/divider';
import ChangeSubscriptionModule from '../change-subscription';
import { AccountDetails, SubscriptionDetails } from './parts';
import { BottomSheet, OutlinedButton, Screen } from '@components/common';

import { formatPhoneNumber } from '@library/method';

import { IAllSubscriptionsResponse, SubscriptionInfo } from '@typings/responses';

interface IMyAccountModule {
  loading?: boolean;
  onRefresh?(): void;
  allSubscriptions: IAllSubscriptionsResponse | undefined;
  subscriptionInfo: SubscriptionInfo;
  onRemoveAccount(): void;
  onChangePassword(): void;
  onCancelSubscription(id: string): void;
  onChangeSubscription(): void;
}

const MyAccountModule: React.FC<IMyAccountModule> = props => {
  const { subscriptionInfo, allSubscriptions, onRemoveAccount, onChangePassword, loading, onRefresh, onCancelSubscription } = props;

  const { colors } = useTheme();
  const user = useAppStore(state => state.user);

  const [toggleModal, setToggleModal] = React.useState(false);

  const email = user?.contactData?.find(contact => contact.type === 'EMAIL')?.value;
  const phone = user?.contactData?.find(contact => contact.type === 'PHONE')?.value;
  const formattedPhone = phone ? formatPhoneNumber(phone, true) : 'N/A';

  return (
    <Screen scroll unsafe loading={loading} onRefresh={onRefresh} style={{ paddingHorizontal: 0 }}>
      <AccountDetails email={email} phone={formattedPhone} onChangePassword={onChangePassword} />
      <SubscriptionDetails subscriptionInfo={subscriptionInfo} onChangeSubscription={() => setToggleModal(prev => !prev)} />
      <BottomSheet
        snapPoints={['80%']}
        isVisible={toggleModal}
        onDismiss={() => setToggleModal(false)}
        backgroundStyle={{ backgroundColor: colors.lightBlue }}>
        <ChangeSubscriptionModule
          allSubscriptions={allSubscriptions}
          onCancelSubscription={id => {
            setToggleModal(false);
            onCancelSubscription(id);
          }}
          subscriptionInfo={subscriptionInfo}
        />
      </BottomSheet>
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
