const MMKV_KEY = {
  SEND_TO: 'SEND_TO',
  APP_TOKEN: 'APP_TOKEN',
  APP_THEME: 'APP_THEME',
  INSERT_OTP: 'INSERT_OTP',
  INSERT_PASSWORD: 'INSERT_PASSWORD',
} as const;

const API_CONFIG = {
  CODE_DEFAULT: -200,
  CODE_SUCCESS: 200,
  ERROR_NETWORK_CODE: -100,
  RESULT_CODE_PUSH_OUT: 401,
  TIME_OUT: 10 * 1000,
  STATUS_TIME_OUT: 'ECONNABORTED',
  CODE_TIME_OUT: 408,
};

enum SLICE_NAME {
  APP = 'APP_',
  AUTHENTICATION = 'AUTHENTICATION_',
}

const REGEX = {
  number: /\d/,
  uppercase: /[A-Z]/,
  special_character: /[!@#$%^&*(),.?":{}|<>]/,
  email:
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export { MMKV_KEY, API_CONFIG, SLICE_NAME, REGEX };
