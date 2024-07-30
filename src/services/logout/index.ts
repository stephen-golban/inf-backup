import { resetAppStore } from '@store/app';
import { usePinCodeStore } from '@store/pin-code';
import * as Keychain from 'react-native-keychain';

function useLogoutService() {
  async function logout() {
    await Keychain.resetInternetCredentials('accessToken');
    await Keychain.resetInternetCredentials('refreshToken');
    usePinCodeStore.setState({ visible: false });
    resetAppStore();
  }

  return logout;
}

export { useLogoutService };
