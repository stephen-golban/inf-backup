import { useEffect, useState, useCallback } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { AppState, AppStateStatus } from 'react-native';
import { setAppIsConnected, useAppStore } from '@store/app';

const useNetWorkStatus = () => {
  const isConnected = useAppStore(state => state.isConnected);

  const handleConnectionChange = useCallback((state: NetInfoState) => {
    setAppIsConnected(state.isConnected ?? false);
  }, []);

  const checkConnection = useCallback(async () => {
    const state = await NetInfo.fetch();
    handleConnectionChange(state);
  }, [handleConnectionChange]);

  useEffect(() => {
    let mounted = true;

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && mounted) {
        await checkConnection();
      }
    };

    // Set up both NetInfo and AppState listeners
    const setupListeners = async () => {
      // Initial check
      if (mounted) {
        await checkConnection();
      }

      // Subscribe to network changes
      const netInfoUnsubscribe = NetInfo.addEventListener(state => {
        if (mounted) {
          handleConnectionChange(state);
        }
      });

      // Subscribe to app state changes
      const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

      return () => {
        netInfoUnsubscribe();
        appStateSubscription.remove();
      };
    };

    const cleanup = setupListeners();

    return () => {
      mounted = false;
      cleanup.then(cleanupFn => cleanupFn());
    };
  }, [handleConnectionChange, checkConnection]);

  return [isConnected, checkConnection] as const;
};

export default useNetWorkStatus;
