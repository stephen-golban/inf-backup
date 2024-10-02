import { useMe } from '@services/me';
import { setLastLogin } from '../util';
import { sleep } from '@library/method';
import { setAppLoading } from '@store/app';
import { AppStorage } from '@library/storage';
import { usePinCodeStore } from '@store/pin-code';
import { useMMKVString } from 'react-native-mmkv';
import { useLogoutService } from '@services/logout';
import { useGetSubscription } from '@services/subscription';

import { PIN_CODE } from '@library/constants';
import { PinCodeT } from '@anhnch/react-native-pincode';

function usePinScreen() {
  const [pin, setPin] = useMMKVString(PIN_CODE.pin, AppStorage);

  const logout = useLogoutService();
  const { getMe, loading: loadingMe } = useMe(false);
  const { getSubscription, loading: loadingSubscription } = useGetSubscription(false);

  async function authorize() {
    await getMe();
    await getSubscription();
    setLastLogin();
  }

  async function onEnter() {
    await authorize();
    return usePinCodeStore.setState({ visible: false });
  }

  async function onSet(val: string) {
    setPin(val);
    await onEnter();
    return usePinCodeStore.setState({ visible: false, mode: PinCodeT.Modes.Enter });
  }

  async function onReset() {
    setAppLoading(true);
    await logout();
    setPin(undefined);
    usePinCodeStore.setState({ mode: PinCodeT.Modes.Set });
    await sleep();
    setAppLoading(false);
  }

  function onModeChanged(newMode?: PinCodeT.Modes | undefined) {
    if (newMode === PinCodeT.Modes.Locked) {
      return onReset();
    }
  }

  const loading = loadingMe || loadingSubscription;

  return {
    pin,
    loading,
    onSet,
    onEnter,
    onReset,
    onModeChanged,
  };
}

export default usePinScreen;
