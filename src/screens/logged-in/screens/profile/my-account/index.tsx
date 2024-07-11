import React from 'react';

import { noop } from 'lodash';
import useMyAccountScreen from './hooks';

import { MyAccountModule } from '@modules/logged-in/screens';

import { PROFILE_SCREENS, type ProfileStackScreenProps } from '@typings/navigation';

const MyAccountScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.MY_ACCOUNT>> = ({ navigation }) => {
  const { loading, subscriptionInfo, allSubscriptions, refetch } = useMyAccountScreen();

  return (
    <MyAccountModule
      loading={loading}
      onRefresh={refetch}
      onRemoveAccount={noop}
      onChangeSubscription={noop}
      allSubscriptions={allSubscriptions}
      subscriptionInfo={subscriptionInfo}
      onChangePassword={() => navigation.navigate(PROFILE_SCREENS.CHANGE_PASSWORD)}
    />
  );
};

export { MyAccountScreen };
