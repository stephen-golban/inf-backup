import React from 'react';

import useMyAccountScreen from './hooks';

import { MyAccountModule } from '@modules/logged-in/screens';

import { LOGGED_IN_SCREENS, PROFILE_SCREENS, Reason, SUBSCRIPTIONS_SCREENS, type ProfileStackScreenProps } from '@typings/navigation';

const MyAccountScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.MY_ACCOUNT>> = ({ navigation }) => {
  const { loading, refetch } = useMyAccountScreen();

  const onHandleSubscription = () => navigation.navigate(LOGGED_IN_SCREENS.SUBSCRIPTIONS, { screen: SUBSCRIPTIONS_SCREENS.INDEX });
  const onRemoveAccount = () => {
    return navigation.navigate(LOGGED_IN_SCREENS.SUBSCRIPTIONS, {
      screen: SUBSCRIPTIONS_SCREENS.REMOVE,
      params: { reason: Reason.REMOVE_ACCOUNT, comment: 'Remove account' },
    });
  };

  return (
    <MyAccountModule
      loading={loading}
      onRefresh={refetch}
      onRemoveAccount={onRemoveAccount}
      onHandleSubscription={onHandleSubscription}
      onChangePassword={() => navigation.navigate(PROFILE_SCREENS.CHANGE_PASSWORD)}
      // onCancelSubscription={() =>
      //   navigation.navigate(LOGGED_IN_SCREENS.FEEDBACK, { screen: FEEDBACK_SCREENS.REASON, params: { reason: Reason.CANCEL_SUBSCRIPTION } })
      // }
    />
  );
};

export { MyAccountScreen };
