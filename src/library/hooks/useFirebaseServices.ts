import { useEffect, useCallback, useMemo } from 'react';
import firebase from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

type EventParams = Record<string, string | number | boolean | null | undefined>;

interface FirebaseServices {
  logScreenView: (screenName: string, screenClass: string) => Promise<void>;
  logEvent: (eventName: string, params?: EventParams) => Promise<void>;
  logError: (error: Error, context?: string) => void;
  setCustomKey: (key: string, value: string | number | boolean) => Promise<void>;
  triggerCrash: () => void;
}

const useFirebaseServices = (): FirebaseServices => {
  // Memoize Firebase instances
  const firebaseInstances = useMemo(
    () => ({
      analytics: analytics(),
      crashlytics: crashlytics(),
    }),
    [],
  );

  useEffect(() => {
    try {
      // Firebase should already be initialized in the app's entry point
      if (!firebase.apps.length) {
        console.warn('Firebase not initialized. Please ensure it is initialized in your app entry point.');
        return;
      }

      firebaseInstances.analytics.logAppOpen();
      firebaseInstances.crashlytics.log('App started.');
    } catch (error) {
      console.error('Failed to initialize Firebase services:', error);
      firebaseInstances.crashlytics.recordError(error as Error);
    }
  }, [firebaseInstances]);

  const logScreenView = useCallback(
    async (screenName: string, screenClass: string): Promise<void> => {
      try {
        await firebaseInstances.analytics.logScreenView({
          screen_name: screenName,
          screen_class: screenClass,
        });
      } catch (error) {
        console.error('Failed to log screen view:', error);
        firebaseInstances.crashlytics.recordError(error as Error);
      }
    },
    [firebaseInstances],
  );

  const logEvent = useCallback(
    async (eventName: string, params: EventParams = {}): Promise<void> => {
      try {
        await firebaseInstances.analytics.logEvent(eventName, params);
      } catch (error) {
        console.error(`Failed to log event ${eventName}:`, error);
        firebaseInstances.crashlytics.recordError(error as Error);
      }
    },
    [firebaseInstances],
  );

  const logError = useCallback(
    (error: Error, context: string = ''): void => {
      try {
        if (context) {
          firebaseInstances.crashlytics.log(`Context: ${context}`);
        }
        firebaseInstances.crashlytics.recordError(error);
      } catch (crashlyticsError) {
        console.error('Failed to log error to Crashlytics:', crashlyticsError);
      }
    },
    [firebaseInstances],
  );

  const setCustomKey = useCallback(
    async (key: string, value: string | number | boolean): Promise<void> => {
      try {
        await firebaseInstances.crashlytics.setAttribute(key, String(value));
      } catch (error) {
        console.error(`Failed to set custom key ${key}:`, error);
        firebaseInstances.crashlytics.recordError(error as Error);
      }
    },
    [firebaseInstances],
  );

  const triggerCrash = useCallback((): void => {
    firebaseInstances.crashlytics.crash();
  }, [firebaseInstances]);

  return {
    logScreenView,
    logEvent,
    logError,
    setCustomKey,
    triggerCrash,
  };
};

export default useFirebaseServices;
