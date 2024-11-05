import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

export const logEvent = async (eventName, params = {}) => {
  await analytics().logEvent(eventName, params);
};

export const setUser = userId => {
  crashlytics().setUserId(userId);
};

export const logScreenView = async screenName => {
  await analytics().logScreenView({ screenName });
};
