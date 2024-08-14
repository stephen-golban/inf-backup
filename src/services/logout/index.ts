import { resetAppStore } from '@store/app';
import { usePinCodeStore } from '@store/pin-code';
import * as Keychain from 'react-native-keychain';

async function logout() {
  await Keychain.resetInternetCredentials('accessToken');
  await Keychain.resetInternetCredentials('refreshToken');
  usePinCodeStore.setState({ visible: false });
  resetAppStore();
}

function useLogoutService() {
  return logout;
}

export { useLogoutService, logout };
