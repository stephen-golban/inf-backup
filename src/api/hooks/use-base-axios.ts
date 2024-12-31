import { base_api } from '../base';
import { useMountedState } from 'react-use';
import { useEffect, useCallback } from 'react';
import useAxiosCancel from './use-axios-cancel';
import useAxiosReducer from './use-axios-reducer';
import { useToast } from 'react-native-toast-notifications';
import { useFirebaseServices, useTranslation, useNetworkStatus } from '@library/hooks';

import type { AxiosResponse } from 'axios';
import type { BaseAxios, BaseError, Config, OnSuccess } from './type';

function useBaseAxios<Data>(url: string): BaseAxios<Data>;
function useBaseAxios<Data>(config: Config<Data>): BaseAxios<Data>;
function useBaseAxios<Data>(url: string, config: Config<Data>): BaseAxios<Data>;
function useBaseAxios<Data>(param1: string | Config<Data>, param2: Config<Data> = {}) {
  const toast = useToast();
  const { t } = useTranslation();
  const { logError, logEvent } = useFirebaseServices();
  const isMounted = useMountedState();
  const [isConnected, canAccess] = useNetworkStatus();
  const [{ data, error, loading }, dispatch] = useAxiosReducer<Data>(typeof param1 === 'string' ? param2.ssrData : param1.ssrData);
  const { cancel, cancelToken } = useAxiosCancel();

  const handleNetworkError = useCallback((lazyConfig?: Config<Data>) => {
    const err = new Error(t('ui:toasts:no_internet_connection'));
    dispatch({ type: 'REQUEST_FAILED', payload: err });
    if (!lazyConfig?.hideErrors) {
      toast.show(t('ui:toasts:no_internet_connection'), { type: 'danger' });
    }
  }, []);

  const createAxiosInvoker = () => {
    if (typeof param1 === 'string') {
      const { axiosInstance = base_api, additionalUrl = '', ...config } = param2;
      return (lazyData: Config<Data>['data'], lazyConfig?: Config<Data>) =>
        axiosInstance(param1 + (lazyConfig?.additionalUrl || additionalUrl), {
          ...config,
          ...lazyConfig,
          data: lazyData || param2.data,
          cancelToken,
        });
    }

    const { axiosInstance = base_api, additionalUrl = '', ...config } = param1;
    return (lazyData: Config<Data>['data'], lazyConfig?: Config<Data>) =>
      axiosInstance({
        ...config,
        ...lazyConfig,
        url: (config.url || lazyConfig?.url || '') + (lazyConfig?.additionalUrl || additionalUrl),
        data: lazyData || param1.data,
        cancelToken,
      });
  };

  const invokeAxios = createAxiosInvoker();

  const getData = useCallback(
    async (lazyData: Config<Data>['data'], onSuccess?: OnSuccess<Data>, lazyConfig?: Config<Data>) => {
      if (!isConnected || !canAccess) {
        handleNetworkError(lazyConfig);
        return;
      }

      dispatch({ type: 'REQUEST_INIT' });
      logEvent('backend_call_initiated', { url: typeof param1 === 'string' ? param1 : param1.url });

      try {
        const res = (await invokeAxios(lazyData, lazyConfig)) as AxiosResponse<Data>;
        if (!isMounted()) return;

        dispatch({ type: 'REQUEST_SUCCESS', payload: res.data });

        if (onSuccess) {
          if (lazyConfig?.hasFinalUrl && res.request?.responseURL) {
            onSuccess(res.data || (res.status as Data), res.status, res.request.responseURL);
          } else {
            onSuccess(res.data || (res.status as Data), res.status);
          }
        }

        return res.data || (res.status as Data);
      } catch (e) {
        if (!isMounted()) return;

        const err = e as BaseError<Data>;

        // Network or connection errors
        if (!err.response || err.message.includes('Network Error') || err.message.includes('timeout')) {
          handleNetworkError(lazyConfig);
          return;
        }

        const errResMessage = (err.response?.data as any)?.message;
        const context = `Error in useBaseAxios with URL: ${typeof param1 === 'string' ? param1 : param1.url}`;
        logError(err, context);

        if (!lazyConfig?.hideErrors) {
          if (errResMessage) {
            toast.show(errResMessage, { type: 'danger' });
          } else if (__DEV__) {
            toast.show(err.message, { type: 'danger' });
          }
        }
        dispatch({ type: 'REQUEST_FAILED', payload: err });
      }
    },
    [cancelToken, isConnected, canAccess, `${JSON.stringify(param1)}.${JSON.stringify(param2)}`],
  );

  useEffect(() => {
    return () => {
      cancel();
    };
  }, []);

  return [getData, { cancel, data, error, loading, refetch: getData }];
}

export default useBaseAxios;
