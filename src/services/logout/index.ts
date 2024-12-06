import { MMKV_KEY, PIN_CODE } from '@library/constants';
import { loadString, remove } from '@library/storage';
import { resetAppStore } from '@store/app';
import { resetAppDataCheckStore } from '@store/data-check';
import { usePinCodeStore } from '@store/pin-code';
import * as Keychain from 'react-native-keychain';
import { OneSignal } from 'react-native-onesignal';

async function logout() {
  const isMpassLogin = loadString(MMKV_KEY.IS_MPASS_LOGIN) === 'true';
  await Keychain.resetInternetCredentials('accessToken');
  await Keychain.resetInternetCredentials('refreshToken');
  resetAppDataCheckStore();
  usePinCodeStore.setState({ visible: false });
  remove(PIN_CODE.pin);
  resetAppStore();
  OneSignal.logout();
  isMpassLogin && remove(MMKV_KEY.IS_MPASS_LOGIN);
}

function useLogoutService() {
  return logout;
}

export { useLogoutService, logout };
