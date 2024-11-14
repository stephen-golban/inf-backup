import { useEffect, useCallback } from 'react';
import firebase from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

const useFirebaseServices = () => {
  useEffect(() => {
    console.log('Initializing Firebase...');
    if (!firebase.apps.length) {
      firebase.initializeApp();
      console.log('Firebase initialized');
    } else {
      console.log('Firebase already initialized');
    }

    analytics().logAppOpen();
    crashlytics().log('App started.');
  }, []);

  const logScreenView = useCallback((screenName: string, screenClass: string) => {
    analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenClass,
    });
  }, []);

  const logEvent = useCallback((eventName: string, params: Record<string, any> = {}) => {
    analytics().logEvent(eventName, params);
  }, []);

  const logError = useCallback((error: Error, context: string = '') => {
    if (context) {
      crashlytics().log(context);
    }
    crashlytics().recordError(error);
  }, []);

  const setCustomKey = useCallback((key: string, value: string | number | boolean) => {
    crashlytics().setAttribute(key, value);
  }, []);

  const triggerCrash = useCallback(() => {
    crashlytics().crash();
  }, []);

  return {
    logScreenView,
    logEvent,
    logError,
    setCustomKey,
    triggerCrash,
  };
};

export default useFirebaseServices;
