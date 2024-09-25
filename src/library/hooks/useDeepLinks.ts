import { Linking } from 'react-native';

const useDeepLinks = () => {
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
    },
    subscribe(listener: (url: string) => void) {
      const onReceiveURL = ({ url }: { url: string }) => listener(url);

      const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

      return () => {
        linkingSubscription.remove();
      };
    },
  };

  return { linking };
};

export default useDeepLinks;
