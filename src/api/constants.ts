import {
  SERVER_IP,
  PORT_OAUTH,
  DEV_CLIENT_ID,
  PORT_SERVICES,
  DEV_CLIENT_SECRET,
  DEV_RESET_PASSWORD_CID,
  DEV_RESET_PASSWORD_CSECR,
  LEAD_SERVER_IP,
  PORT_LEAD,
  LEAD_CLIENT_ID,
  LEAD_CLIENT_SECRET,
} from '@env';
import base64 from 'react-native-base64';

export const BASE_URL = `http://${SERVER_IP}:${PORT_SERVICES}`;
export const BASE_OAUTH_URL = `http://${SERVER_IP}:${PORT_OAUTH}`;
export const BASE_LEAD_URL = `http://${LEAD_SERVER_IP}:${PORT_LEAD}`;

export const OAUTH_TOKEN = base64.encode(`${DEV_CLIENT_ID}:${DEV_CLIENT_SECRET}`);
export const LEAD_TOKEN = base64.encode(`${LEAD_CLIENT_ID}:${LEAD_CLIENT_SECRET}`);

export const RESET_PASSWORD_TOKEN = base64.encode(`${DEV_RESET_PASSWORD_CID}:${DEV_RESET_PASSWORD_CSECR}`);
