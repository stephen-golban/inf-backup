import { AppState, type AppStateStatus } from 'react-native';
import type { ProviderConfiguration, SWRConfiguration } from 'swr/_internal';
import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';

type SWRConfigValue = ProviderConfiguration & SWRConfiguration;

function initFocus<C extends SWRConfigValue['initFocus']['caller']>(callback: C) {
  let { currentState } = AppState;

  const onAppStateChange = (nextAppState: AppStateStatus) => {
    if (currentState.match(/inactive|background/) && nextAppState === 'active') {
      callback();
    }

    currentState = nextAppState;
  };

  const subscription = AppState.addEventListener('change', onAppStateChange);

  return () => subscription.remove();
}

function initReconnect<C extends SWRConfigValue['initReconnect']['caller']>(callback: C, net: NetInfoState) {
  let { isInternetReachable } = net;

  const onNetInfoChange = (nextState: NetInfoState) => {
    if (nextState.isInternetReachable !== isInternetReachable) {
      callback();
    }

    isInternetReachable = nextState.isInternetReachable;
  };

  const subscription = NetInfo.addEventListener(onNetInfoChange);

  return () => subscription();
}

function isOnline(net: NetInfoState): boolean {
  return net.isInternetReachable ?? false;
}

export { initFocus, initReconnect, isOnline };
