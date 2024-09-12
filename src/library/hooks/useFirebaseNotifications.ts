import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Linking } from 'react-native';

const NAVIGATION_IDS = ['home', 'settings'];

function buildDeepLinkFromNotificationData(data: any): string | null {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    // console.warn('Unverified navigationId', navigationId);
    return null;
  }
  if (navigationId === 'home') {
    return 'infodebit://home';
  }
  if (navigationId === 'settings') {
    return 'infodebit://settings';
  }

  return null;
}

const useFirebaseNotifications = () => {
  const linking = {
    prefixes: ['infodebit://'],
    config: {
      screens: {
        Home: 'home',
        Settings: 'settings',
      },
    },
    async getInitialURL() {
      const url = await Linking.getInitialURL();
      if (typeof url === 'string') {
        return url;
      }
      const message = await messaging().getInitialNotification();
      const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
      if (typeof deeplinkURL === 'string') {
        return deeplinkURL;
      }
    },
    subscribe(listener: (url: string) => void) {
      const onReceiveURL = ({ url }: { url: string }) => listener(url);

      const linkingSubscription = Linking.addEventListener('url', onReceiveURL);
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });

      const foreground = messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', remoteMessage);
      });

      const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
        const url = buildDeepLinkFromNotificationData(remoteMessage.data);
        if (typeof url === 'string') {
          listener(url);
        }
      });

      return () => {
        linkingSubscription.remove();
        unsubscribe();
        foreground();
      };
    },
  };

  // useEffect(() => {
  //   const requestUserPermission = async () => {
  //     await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  //     const authStatus = await messaging().requestPermission();
  //     const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //       const token = await messaging().getToken();
  //       console.log('FCM token:', token);
  //     }
  //   };

  //   requestUserPermission();
  // }, []);

  return { linking };
};

export default useFirebaseNotifications;
