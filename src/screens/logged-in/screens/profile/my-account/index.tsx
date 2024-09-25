import React from 'react';

import useMyAccountScreen from './hooks';
import { useGoBack } from '@library/hooks';

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
  useGoBack(true, navigation.goBack);
  return (
    <MyAccountModule
      loading={loading}
      onRefresh={refetch}
      onRemoveAccount={onRemoveAccount}
      onHandleSubscription={onHandleSubscription}
      onChangePassword={() => navigation.navigate(PROFILE_SCREENS.CHANGE_PASSWORD)}
    />
  );
};

export { MyAccountScreen };
