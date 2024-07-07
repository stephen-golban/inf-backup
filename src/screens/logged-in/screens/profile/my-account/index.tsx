import React from 'react';
import { noop } from 'lodash';
import useMyAccountScreen from './hooks';
import { useAppStore } from '@store/app';
import { MyAccountModule } from '@modules/logged-in/screens';
import { ActivityIndicator, View } from '@components/common';
import { PROFILE_SCREENS, ProfileStackScreenProps } from '@typings/navigation/core/logged-in/screens/profile';

const MyAccountScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.MY_ACCOUNT>> = ({ navigation }) => {
  const user = useAppStore(state => state.user);

  const { loading, subscriptionInfo, allSubscriptions } = useMyAccountScreen();

  if (loading) {
    return (
      <View justify="center" fill>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <MyAccountModule
      user={user}
      onRemoveAccount={noop}
      onChangeSubscription={noop}
      allSubscriptions={allSubscriptions}
      subscriptionInfo={subscriptionInfo}
      onChangePassword={() => navigation.navigate(PROFILE_SCREENS.CHANGE_PASSWORD)}
    />
  );
};

export { MyAccountScreen };
