import { resetAppStore } from '@store/app';
import { resetAppDataCheckStore } from '@store/data-check';
import * as Keychain from 'react-native-keychain';

async function logout() {
  await Keychain.resetInternetCredentials('accessToken');
  await Keychain.resetInternetCredentials('refreshToken');
  resetAppDataCheckStore();
  resetAppStore();
}

function useLogoutService() {
  return logout;
}

export { useLogoutService, logout };
