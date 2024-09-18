import { useMe } from '@services/me';
import { sleep } from '@library/method';
import { AppStorage } from '@library/storage';
import { useMMKVString } from 'react-native-mmkv';
import { useLogoutService } from '@services/logout';
import { setAppLoading, useAppStore } from '@store/app';
import { useEffect, useState, useCallback } from 'react';
import { useSubscriptionValidation } from '@services/subscription';

import { PIN_CODE } from '@library/constants';
import { PinCodeT } from '@anhnch/react-native-pincode';
import { APP_SCREEN, LOGGED_IN_STACK, LOGGED_IN_SCREENS, SUBSCRIPTIONS_SCREENS, type RootStackScreenProps } from '@typings/navigation';

function usePinScreen({ navigation, route }: RootStackScreenProps<APP_SCREEN.PIN_SCREEN>) {
  const [mode, setMode] = useState(route.params?.mode);
  const loadingApp = useAppStore(state => state.loadingApp);
  const [pin, setPin] = useMMKVString(PIN_CODE.pin, AppStorage);

  const logout = useLogoutService();
  const { getMe, loading: loadingMe } = useMe(false);
  const { validateSubscription, loading: loadingSubscription } = useSubscriptionValidation();

  const resetToSubscriptionScreen = useCallback(
    (screen: SUBSCRIPTIONS_SCREENS) => {
      return navigation?.reset({
        index: 0,
        routes: [
          {
            name: APP_SCREEN.LOGGED_IN,
            params: { screen: LOGGED_IN_STACK.SCREENS, params: { screen: LOGGED_IN_SCREENS.SUBSCRIPTIONS, params: { screen } } },
          },
        ],
      });
    },
    [navigation],
  );

  const handleSubscriptionValidation = useCallback(async () => {
    const subscriptionScreen = await validateSubscription();

    if (subscriptionScreen) {
      return resetToSubscriptionScreen(subscriptionScreen);
    }
    // Valid subscription, navigate to home
    return navigation.reset({
      index: 0,
      routes: [{ name: APP_SCREEN.LOGGED_IN }],
    });
  }, [validateSubscription, resetToSubscriptionScreen, navigation]);

  const resetPin = useCallback(async () => {
    setAppLoading(true);
    await logout();
    setPin(undefined);
    setMode(PinCodeT.Modes.Set);
    await sleep();
    setAppLoading(false);
  }, [logout, setPin]);

  const enterPin = useCallback(async () => {
    setAppLoading(true);
    await getMe();
    await handleSubscriptionValidation();
    await sleep(500);
    setAppLoading(false);
  }, [getMe, handleSubscriptionValidation]);

  const setPinCode = useCallback(
    async (val: string) => {
      setPin(val);
      await enterPin();
      setMode(PinCodeT.Modes.Enter);
    },
    [enterPin, setPin],
  );

  const handleModeChange = useCallback(
    (newMode?: PinCodeT.Modes) => {
      if (newMode === PinCodeT.Modes.Locked) {
        resetPin();
      }
    },
    [resetPin],
  );

  useEffect(() => {
    if (pin) {
      setMode(route.params?.mode || PinCodeT.Modes.Enter);
    } else {
      setMode(PinCodeT.Modes.Set);
    }
  }, [pin, route.params?.mode]);

  return {
    setPinCode,
    enterPin,
    resetPin,
    handleModeChange,
    pin,
    mode,
    loading: loadingApp || loadingMe || loadingSubscription,
  };
}

export default usePinScreen;
