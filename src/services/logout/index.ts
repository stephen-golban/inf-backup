import { MMKV_KEY } from '@library/constants';
import { loadString, remove } from '@library/storage';
import { resetAppStore } from '@store/app';
import { resetAppDataCheckStore } from '@store/data-check';
import { usePinCodeStore } from '@store/pin-code';
import * as Keychain from 'react-native-keychain';
import { OneSignal } from 'react-native-onesignal';

async function onLogout(isMpass = false) {
  await Keychain.resetInternetCredentials('accessToken');
  await Keychain.resetInternetCredentials('refreshToken');
  resetAppDataCheckStore();
  usePinCodeStore.setState({ visible: false });
  resetAppStore();
  OneSignal.logout();
  isMpass && remove(MMKV_KEY.IS_MPASS_LOGIN);
}

function useLogoutService() {
  const isMpassLogin = loadString(MMKV_KEY.IS_MPASS_LOGIN) === 'true';
  const logout = () => onLogout(isMpassLogin);
  return logout;
}

export { useLogoutService };
