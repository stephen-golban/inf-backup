import * as Keychain from 'react-native-keychain';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { auth_api } from '@api/base';
import { logout } from '@services/logout';

type Token = {
  access_token: string;
  refresh_token: string;
};

export const onResponseInterceptor = (response: AxiosResponse) => response;

export async function refreshTokens() {
  const refreshToken = ((await Keychain.getInternetCredentials('refreshToken')) as Keychain.SharedWebCredentials)?.password;
  const queryParams = {
    key: 'refresh_token',
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };

  const response = await auth_api.post<Token>('/auth/oauth/token', queryParams);

  const { access_token, refresh_token } = response.data;

  await Keychain.setInternetCredentials('accessToken', 'user', access_token);
  await Keychain.setInternetCredentials('refreshToken', 'user', refresh_token);

  return { access_token, refresh_token };
}

export const onResponseError = async (error: AxiosError, instance: AxiosInstance) => {
  const originalRequest: InternalAxiosRequestConfig = error.config!;

  const isLoggedIn = !!(await Keychain.getInternetCredentials('refreshToken'));
  if (error.response?.status === 401 && originalRequest.url !== '/auth/oauth/token') {
    if (isLoggedIn) {
      const res = await refreshTokens();
      if (res) {
        originalRequest.headers['Authorization'] = `Bearer ${res.access_token}`;
        return instance(originalRequest);
      }
      return Promise.reject(error);
    }
    logout();
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

export const addRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    if (config.headers['Authorization']) {
      // If Authorization header is already set in the config, use it
      return config;
    }

    const accessToken = (await Keychain.getInternetCredentials('accessToken')) as Keychain.SharedWebCredentials;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken.password}`;
    }
    return config;
  });
};

export const addResponseInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(onResponseInterceptor, (error: AxiosError) => onResponseError(error, instance));
};
