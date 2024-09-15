import { resetAppStore } from '@store/app';
import { usePinCodeStore } from '@store/pin-code';
import * as Keychain from 'react-native-keychain';
import { OneSignal } from 'react-native-onesignal';

async function logout() {
  await Keychain.resetInternetCredentials('accessToken');
  await Keychain.resetInternetCredentials('refreshToken');
  usePinCodeStore.setState({ visible: false });
  resetAppStore();
  OneSignal.logout();
}

function useLogoutService() {
  return logout;
}

export { useLogoutService, logout };
