import { useMe } from '@services/me';
import { sleep } from '@library/method';
import { AppStorage, saveString } from '@library/storage';
import { useMMKVString } from 'react-native-mmkv';
import { usePinCodeStore } from '@store/pin-code';
import { useLogoutService } from '@services/logout';
import { setAppIsAuthenticated, setAppLoading, useAppStore } from '@store/app';

import { MMKV_KEY, PIN_CODE } from '@library/constants';
import { PinCodeT } from '@anhnch/react-native-pincode';
import { format } from 'date-fns';

export default function usePinScreen() {
  const logout = useLogoutService();
  const { getMe, loading } = useMe(false);
  const [pin, setPin] = useMMKVString(PIN_CODE.pin, AppStorage);
  const { isAuthenticated, loadingApp } = useAppStore(state => state);

  const handleSignIn = async () => {
    await getMe();
    setAppIsAuthenticated(true);
  };

  async function onReset() {
    setAppLoading(true);
    await logout();
    setPin(undefined);
    usePinCodeStore.setState({ mode: PinCodeT.Modes.Set });
    await sleep();
    setAppLoading(false);
  }

  async function onEnter() {
    if (!isAuthenticated) {
      await handleSignIn();
    }

    const currentTimestamp = new Date();
    const formattedDate = format(currentTimestamp, 'dd.MM.yyyy, HH:mm');
    saveString(MMKV_KEY.LAST_LOGIN, formattedDate);

    return usePinCodeStore.setState({ visible: false });
  }

  async function onSet(val: string) {
    setPin(val);
    usePinCodeStore.setState({ visible: false, mode: PinCodeT.Modes.Enter });
    await handleSignIn();
  }

  function onModeChanged(newMode?: PinCodeT.Modes | undefined) {
    if (newMode === PinCodeT.Modes.Locked) {
      return onReset();
    }
  }

  return {
    onEnter,
    onReset,
    onSet,
    onModeChanged,
    pin,
    loading: loadingApp || loading,
  };
}
