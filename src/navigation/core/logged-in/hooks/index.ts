import { useEffect } from 'react';
import { isAfter } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { useGetSubscription } from '@services/subscription';
import { useGetNomenclatures } from '@services/nomenclatures';

import { type NavigationProp } from '@react-navigation/native';
import { LOGGED_IN_STACK, PROFILE_SCREENS, LOGGED_IN_SCREENS, SUBSCRIPTIONS_SCREENS, type LoggedInStackParams } from '@typings/navigation';

export default function useLoggedInNavigation() {
  const navigation = useNavigation<NavigationProp<LoggedInStackParams>>();

  const { loading: loadingNomenclatures } = useGetNomenclatures('STAGES');
  const { loading: loadingSubscription, subscription } = useGetSubscription(true);

  useEffect(() => {
    if (subscription) {
      if (isAfter(new Date(), new Date(subscription.subscriptionAccounts[0].termDateTime))) {
        navigation.navigate(LOGGED_IN_STACK.SCREENS, {
          screen: LOGGED_IN_SCREENS.PROFILE,
          params: { screen: PROFILE_SCREENS.SUBSCRIPTIONS, params: { screen: SUBSCRIPTIONS_SCREENS.INDEX } },
        });
      }
    }
  }, [subscription]);

  return {
    loading: loadingSubscription || loadingNomenclatures,
  };
}
