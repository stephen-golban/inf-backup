import * as Keychain from 'react-native-keychain';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

type Token = {
  access_token: string;
  refresh_token: string;
};

export const onResponseInterceptor = (response: AxiosResponse) => response;

export async function refreshTokens(instance: AxiosInstance) {
  const refreshToken = ((await Keychain.getInternetCredentials('refreshToken')) as Keychain.SharedWebCredentials)?.password;
  const response = await instance.post<Token>('/auth/oauth/token', { grant_type: 'refresh_token', refresh_token: refreshToken });

  const { access_token, refresh_token } = response.data;

  await Keychain.setInternetCredentials('accessToken', 'user', access_token);
  await Keychain.setInternetCredentials('refreshToken', 'user', refresh_token);

  return { access_token, refresh_token };
}

export const onResponseError = async (error: AxiosError, instance: AxiosInstance) => {
  const originalRequest: InternalAxiosRequestConfig = error.config!;

  const isLoggedIn = !!(await Keychain.getInternetCredentials('refreshToken'));
  if (error.response?.status === 401 && originalRequest.url !== '/auth/oauth/token' && isLoggedIn) {
    const res = await refreshTokens(instance);
    if (res) {
      originalRequest.headers['Authorization'] = `Bearer ${res.access_token}`;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

export const addRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
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
