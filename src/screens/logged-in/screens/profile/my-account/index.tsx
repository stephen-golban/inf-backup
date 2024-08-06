import React from 'react';

import { noop } from 'lodash';

import { useMount } from 'react-use';
import useMyAccountScreen from './hooks';

import { MyAccountModule } from '@modules/logged-in/screens';

import { FEEDBACK_SCREENS, Reason } from '@typings/navigation/core/logged-in/screens/feedback';
import { LOGGED_IN_SCREENS, PROFILE_SCREENS, type ProfileStackScreenProps } from '@typings/navigation';

const MyAccountScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.MY_ACCOUNT>> = ({ navigation }) => {
  const { loading, subscriptionInfo, allSubscriptions, refetch } = useMyAccountScreen();

  useMount(refetch);

  return (
    <MyAccountModule
      loading={loading}
      onRefresh={refetch}
      onRemoveAccount={noop}
      onChangeSubscription={noop}
      allSubscriptions={allSubscriptions}
      subscriptionInfo={subscriptionInfo}
      onChangePassword={() => navigation.navigate(PROFILE_SCREENS.CHANGE_PASSWORD)}
      onCancelSubscription={() =>
        navigation.navigate(LOGGED_IN_SCREENS.FEEDBACK, { screen: FEEDBACK_SCREENS.REASON, params: { reason: Reason.CANCEL_SUBSCRIPTION } })
      }
    />
  );
};

export { MyAccountScreen };
