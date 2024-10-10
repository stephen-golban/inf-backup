import { format } from 'date-fns';
import { Linking } from 'react-native';
import { Alert, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import InAppBrowser from 'react-native-inappbrowser-reborn';

type TypesBase = 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';

export const onShowErrorBase = (msg: string) => {
  Alert.alert(msg);
};

export const isTypeof = (source: any, type: TypesBase): source is TypesBase => {
  return typeof source === type;
};

export const checkKeyInObject = (T: Record<string, unknown>, key: string) => {
  return Object.keys(T).includes(key);
};

export const propsToStyle = (arrStyle: Array<any>) => {
  return arrStyle.filter(x => x !== undefined && !Object.values(x).some(v => v === undefined));
};

export const execFunc = <Fn extends (...args: any[]) => any>(func?: Fn | null, ...args: Parameters<Fn>) => {
  if (isTypeof(func, 'function')) {
    func(...args);
  }
};

export const isEmulator = async () => await DeviceInfo.isEmulator();

export function isJSON(string: string) {
  try {
    const obj = JSON.parse(string);
    if (obj && typeof obj === 'object') {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
}

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const sleep = (ms: number = 1000) => new Promise(r => setTimeout(r as any, ms));

export const validatePassword = (password: string, confirmPassword: string) => {
  const isUppercase = /[A-Z]/.test(password);
  const isNumber = /\d/.test(password);
  const isSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isMin8Char = password.length >= 8;
  const isPasswordSame = password !== '' && password === confirmPassword;

  return { isUppercase, isNumber, isSpecialChar, isMin8Char, isPasswordSame };
};

export const formatPhoneNumber = (phoneNumber: string, isMasked: boolean = true): string => {
  const prefix = phoneNumber.slice(0, 4);
  const firstDigit = phoneNumber.slice(4, 5);

  if (isMasked) {
    const maskedPart = 'x xxx xxx';
    return `${prefix} ${firstDigit}${maskedPart}`;
  } else {
    const firstPart = phoneNumber.slice(5, 8);
    const secondPart = phoneNumber.slice(8, 11);
    return `${prefix} ${firstDigit} ${firstPart} ${secondPart}`;
  }
};

export const currencyFormat = (price: number | string) => {
  const numberPrice = typeof price === 'string' ? parseFloat(price.replace(',', '.')) : price;

  const roundedPrice = Math.round(numberPrice);

  const formattedPrice = new Intl.NumberFormat('ro-RO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(roundedPrice);

  return `${formattedPrice} LEI`;
};

export const openBrowserAsync = async (url: string = 'https://www.google.com') => {
  try {
    const isAvailable = await InAppBrowser.isAvailable();
    if (isAvailable) {
      InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: 'gray',
        preferredControlTintColor: 'white',
        // Android Properties
        animated: true,
        // modalPresentationStyle: 'fullScreen',
        showTitle: true,
        modalEnabled: true,
        toolbarColor: '#6200EE',
        secondaryToolbarColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: true,
      });
    } else {
      Linking.openURL(url);
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const openBrowserAuthAsync = async (url: string, redirectUrl: string) => {
  const isAvailable = await InAppBrowser.isAvailable();
  if (isAvailable) {
    return InAppBrowser.openAuth(url, redirectUrl, {
      // iOS Properties
      dismissButtonStyle: 'cancel',
      preferredBarTintColor: 'gray',
      preferredControlTintColor: 'white',
      // Android Properties
      animated: true,
      // modalPresentationStyle: 'fullScreen',
      showTitle: true,
      modalEnabled: true,
      toolbarColor: '#6200EE',
      secondaryToolbarColor: 'black',
      enableUrlBarHiding: true,
      ephemeralWebSession: true,
      enableDefaultShare: true,
      forceCloseOnRedirection: true,
    });
  }
  return;
};

export const closeInAppBrowser = () => InAppBrowser.close();

export const getQueryParams = <T>(url: string) => {
  const params: { [key: string]: string } = {};

  const queryStringIndex = url.indexOf('?');

  if (queryStringIndex !== -1) {
    const queryString = url.substring(queryStringIndex + 1);

    const pairs = queryString.split('&');

    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      if (key && value) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    });
  }

  return params as T;
};

export type Currency = 'MDL' | 'EUR' | 'USD' | 'RON' | 'RUB' | 'UAH' | 'KZT';

type CurrencyMap = { [key in Currency]: string };

const currencyMap: CurrencyMap = {
  MDL: 'lei',
  EUR: '€',
  USD: '$',
  RON: 'lei',
  RUB: '₽',
  UAH: '₴',
  KZT: '₸',
};

export const formatToCurrency = (value: number | string, currency: Currency = 'MDL'): [string, string] => {
  const converted = typeof value === 'string' ? Math.ceil(Number(value)) : Math.ceil(value);

  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(converted);

  return [currencyMap[currency], formattedValue];
};
