import { resetAppStore } from '@store/app';
import { resetAppDataCheckStore } from '@store/data-check';
import * as Keychain from 'react-native-keychain';
import { OneSignal } from 'react-native-onesignal';

async function logout() {
  await Keychain.resetInternetCredentials('accessToken');
  await Keychain.resetInternetCredentials('refreshToken');
  resetAppDataCheckStore();
  resetAppStore();
  OneSignal.logout();
}

function useLogoutService() {
  return logout;
}

export { useLogoutService, logout };
