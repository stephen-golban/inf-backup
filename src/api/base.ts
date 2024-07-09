import axios from 'axios';
import { BASE_OAUTH_URL, BASE_URL, OAUTH_TOKEN, RESET_PASSWORD_TOKEN } from './constants';
import { addRequestInterceptor, addResponseInterceptors } from './interceptors';

const base_api = axios.create({ baseURL: BASE_URL });
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

export { base_api, auth_api, reset_password_api };
