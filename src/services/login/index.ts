import * as Keychain from 'react-native-keychain';

import { useTryCatch } from '@library/hooks';
import { useMMKVString } from 'react-native-mmkv';
import { usePinCodeStore } from '@store/pin-code';
import { setAppIsAuthenticated } from '@store/app';
import { useDeviceInfoService } from '@services/device-info';

import { MMKV_KEY, PIN_CODE } from '@library/constants';
import { PinCodeT } from '@anhnch/react-native-pincode';
import { AppStorage, loadString, remove, saveString } from '@library/storage';

function useLoginService() {
  const service = useDeviceInfoService();
  const [pin] = useMMKVString(PIN_CODE.pin, AppStorage);

  const saveTokens = async (accessToken: string, refreshToken: string, isMpass = false) => {
    isMpass && saveString(MMKV_KEY.IS_MPASS_LOGIN, 'true');
    await Keychain.setInternetCredentials('accessToken', 'user', accessToken);
    await Keychain.setInternetCredentials('refreshToken', 'user', refreshToken);
  };

  const handleDeviceToken = async () => {
    if (loadString(MMKV_KEY.DEVICE_TOKEN)) {
      await service.saveDeviceToken().then(() => remove(MMKV_KEY.DEVICE_TOKEN));
    }
  };

  const setPinCodeState = () => {
    if (pin) {
      usePinCodeStore.setState({ visible: true, mode: PinCodeT.Modes.Enter });
    } else {
      usePinCodeStore.setState({ visible: true, mode: PinCodeT.Modes.Set });
    }
  };

  const onRequestSuccess = useTryCatch(async (data: any, isMpass = false) => {
    const { access_token, refresh_token } = data;
    await saveTokens(access_token, refresh_token, isMpass);
    await handleDeviceToken();
    setAppIsAuthenticated(true);
    setPinCodeState();
  });

  return { onRequestSuccess, service };
}

export { useLoginService };
