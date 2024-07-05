import { resetAppStore } from '@store/app';
import * as Keychain from 'react-native-keychain';

function useLogoutService() {
  async function logout() {
    await Keychain.resetInternetCredentials('accessToken');
    await Keychain.resetInternetCredentials('refreshToken');
    resetAppStore();
  }

  return logout;
}

export { useLogoutService };
