import * as Keychain from 'react-native-keychain';

import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useMMKVString } from 'react-native-mmkv';
import { usePinCodeStore } from '@store/pin-code';
import { setAppIsAuthenticated } from '@store/app';
import { useDeviceInfoService } from '@services/device-info';

import { MMKV_KEY, PIN_CODE } from '@library/constants';
import { PinCodeT } from '@anhnch/react-native-pincode';
import { AppStorage, loadString, remove } from '@library/storage';

type MpassTokenResponse = {
  access_token: string;
  refresh_token: string;
};

function useLoginService() {
  const service = useDeviceInfoService();
  const [pin] = useMMKVString(PIN_CODE.pin, AppStorage);
  const [getToken, { loading: mpassTokenLoading }] = useLazyAxios<MpassTokenResponse>('/mpass/token', { method: 'get' });

  const saveTokens = async (accessToken: string, refreshToken: string) => {
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

  const onMpassRequest = async (uuid: string) => {
    const res = await getToken(undefined, undefined, { additionalUrl: `/${uuid}` });
    if (!res) return;
    return onRequestSuccess(res);
  };

  const onRequestSuccess = useTryCatch(async (data: any) => {
    const { access_token, refresh_token } = data;

    await saveTokens(access_token, refresh_token);
    await handleDeviceToken();
    setAppIsAuthenticated(true);
    setPinCodeState();
  });

  return { onRequestSuccess, onMpassRequest, service, mpassTokenLoading };
}

export { useLoginService };
