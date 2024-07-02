import {
  SERVER_IP,
  PORT_OAUTH,
  DEV_CLIENT_ID,
  PORT_SERVICES,
  DEV_CLIENT_SECRET,
  DEV_CLIENT_RESET_PASSWORD_ID,
  DEV_CLIENT_RESET_PASSWORD_SECRET,
} from '@env';
import base64 from 'react-native-base64';

export const BASE_URL = `http://${SERVER_IP}:${PORT_SERVICES}`;
export const BASE_OAUTH_URL = `http://${SERVER_IP}:${PORT_OAUTH}`;

export const OAUTH_TOKEN = base64.encode(`${DEV_CLIENT_ID}:${DEV_CLIENT_SECRET}`);

export const RESET_PASSWORD_TOKEN = base64.encode(`${DEV_CLIENT_RESET_PASSWORD_ID}:${DEV_CLIENT_RESET_PASSWORD_SECRET}`);
