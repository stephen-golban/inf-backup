import { useMe } from '@services/me';
import { sleep } from '@library/method';
import { AppStorage } from '@library/storage';
import { useMMKVString } from 'react-native-mmkv';
import { useLogoutService } from '@services/logout';
import { useEffect, useState, useCallback } from 'react';
import { useGetSubscription } from '@services/subscription';
import { setAppIsAuthenticated, setAppLoading, useAppStore } from '@store/app';

import { PIN_CODE } from '@library/constants';
import { PinCodeT } from '@anhnch/react-native-pincode';
import { APP_SCREEN, type RootStackScreenProps } from '@typings/navigation';

function usePinScreen({ route }: RootStackScreenProps<APP_SCREEN.PIN_SCREEN>) {
  const [mode, setMode] = useState(route.params?.mode);
  const loadingApp = useAppStore(state => state.loadingApp);
  const [pin, setPin] = useMMKVString(PIN_CODE.pin, AppStorage);

  const logout = useLogoutService();
  const { getMe, loading: loadingMe } = useMe(false);
  const { getSubscription } = useGetSubscription(false);

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
    await getSubscription();
    setAppIsAuthenticated(true);
    await sleep(500);
    setAppLoading(false);
  }, [getMe]);

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
    loading: loadingApp || loadingMe,
  };
}

export default usePinScreen;
