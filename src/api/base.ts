import axios from 'axios';
import { addRequestInterceptor, addResponseInterceptors } from './interceptors';
import { BASE_OAUTH_URL, BASE_URL, OAUTH_TOKEN, BASE_LEAD_URL, LEAD_TOKEN, RESET_PASSWORD_TOKEN } from './constants';

const base_api = axios.create({ baseURL: BASE_URL });

const lead_api = axios.create({
  baseURL: BASE_LEAD_URL,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    Authorization: `Basic ${LEAD_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

const auth_api = axios.create({
  baseURL: BASE_OAUTH_URL,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    Authorization: `Basic ${OAUTH_TOKEN}`,
    'Content-Type': 'multipart/form-data',
  },
});

const reset_password_api = axios.create({
  baseURL: BASE_OAUTH_URL,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    Authorization: `Basic ${RESET_PASSWORD_TOKEN}`,
    'Content-Type': 'multipart/form-data',
  },
});

addRequestInterceptor(base_api);
addResponseInterceptors(base_api);

export { base_api, auth_api, lead_api, reset_password_api };
