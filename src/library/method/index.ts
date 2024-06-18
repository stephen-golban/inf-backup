import { Alert, Platform } from 'react-native';

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
