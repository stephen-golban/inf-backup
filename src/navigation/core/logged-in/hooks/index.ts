import { useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import { useGetNomenclatures } from '@services/nomenclatures';

import { APP_SCREEN, LOGGED_IN_STACK, LOGGED_IN_SCREENS, SUBSCRIPTIONS_SCREENS, type RootStackParamList } from '@typings/navigation';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSubscriptionValidation } from '@services/subscription';

export default function useLoggedInNavigation(navigation: NativeStackNavigationProp<RootStackParamList, APP_SCREEN.LOGGED_IN>) {
  const { loading: loadingNomenclatures } = useGetNomenclatures('STAGES');
  const { loading: loadingSubscription, validateSubscription, subscription } = useSubscriptionValidation();

  const navigateToSubscriptions = useCallback(
    (screen: SUBSCRIPTIONS_SCREENS) => {
      navigation.navigate(APP_SCREEN.LOGGED_IN, {
        screen: LOGGED_IN_STACK.SCREENS,
        params: { screen: LOGGED_IN_SCREENS.SUBSCRIPTIONS, params: { screen } },
      });
    },
    [navigation],
  );

  // checking for subscription changes and if there are, then navigate to the appropriate screen

  const handleSubscriptionValidation = useCallback(async () => {
    const subscriptionScreen = await validateSubscription();

    if (subscriptionScreen) {
      return navigateToSubscriptions(subscriptionScreen);
    }
  }, [validateSubscription, navigateToSubscriptions, navigation]);

  useUpdateEffect(() => {
    handleSubscriptionValidation();
  }, [subscription]);

  return {
    loading: loadingNomenclatures || loadingSubscription,
  };
}
