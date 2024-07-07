import React from 'react';

import { useTheme } from '@theme/index';
import { BottomSheet, ScrollView } from '@components/common';
import ChangeSubscriptionModule from '../change-subscription';
import { AccountDetails, SubscriptionDetails } from './parts';

import { formatPhoneNumber } from '@library/method';

import { User } from '@typings/user';
import { IAllSubscriptionsResponse } from '@typings/responses/subscriptions/all-subscriptions';
import { SubscriptionInfo } from '@typings/responses/subscriptions/purchased-subscriptions';

interface IMyAccountModule {
  user: User | null;
  allSubscriptions: IAllSubscriptionsResponse | null;
  subscriptionInfo: SubscriptionInfo;
  onRemoveAccount(): void;
  onChangePassword(): void;
  onChangeSubscription(): void;
}

const MyAccountModule: React.FC<IMyAccountModule> = props => {
  const { colors } = useTheme();
  const [toggleModal, setToggleModal] = React.useState<boolean>(false);
  const { user, subscriptionInfo, allSubscriptions, onRemoveAccount, onChangePassword } = props;
  const email = user?.contactData?.find(contact => contact.type === 'EMAIL')?.value;
  const phone = user?.contactData?.find(contact => contact.type === 'PHONE')?.value;
  const formattedPhone = phone ? formatPhoneNumber(phone, true) : 'N/A';

  return (
    <ScrollView mt="lg">
      <AccountDetails email={email} phone={formattedPhone} onChangePassword={onChangePassword} />
      <SubscriptionDetails
        onRemoveAccount={onRemoveAccount}
        subscriptionInfo={subscriptionInfo}
        onChangeSubscription={() => setToggleModal(prev => !prev)}
      />
      <BottomSheet
        snapPoints={['80%']}
        isVisible={toggleModal}
        onDismiss={() => setToggleModal(false)}
        backgroundStyle={{ backgroundColor: colors.lightBlue }}>
        <ChangeSubscriptionModule allSubscriptions={allSubscriptions} subscriptionInfo={subscriptionInfo} />
      </BottomSheet>
    </ScrollView>
  );
};

export { MyAccountModule };
