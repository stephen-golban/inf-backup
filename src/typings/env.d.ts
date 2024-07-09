declare module '@env' {
  export const API_URL: string;
  export const VERSION_CODE: string;
  export const APP_DISPLAY_NAME: string;
  export const BUNDLE_IDENTIFIER: string;
  export const PRIVATE_KEY_STORAGE: string;
  export const DEFAULT_FALLBACK_LNG_I18n: string;

  export const PORT_OAUTH: string;
  export const PORT_SERVICES: string;
  export const PORT_ACTUATOR: string;

  export const SERVER_IP: string;

  // * token credential parts
  export const DEV_CLIENT_ID: string;
  export const DEV_CLIENT_SECRET: string;

  export const DEV_CLIENT_RESET_PASSWORD_ID: string;
  export const DEV_CLIENT_RESET_PASSWORD_SECRET: string;

  export const DEV_RESET_PASSWORD_CNAME: string;
  export const DEV_RESET_PASSWORD_CPWORD: string;
  export const DEV_RESET_PASSWORD_CID: string;
  export const DEV_RESET_PASSWORD_CSECR: string;
}
