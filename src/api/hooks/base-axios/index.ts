import { base_api } from '../../base';
import { useMountedState } from 'react-use';
import useAxiosReducer from './use-axios-reducer';
import useErrorHandler from './use-error-handler';
import { useEffect, useCallback, useMemo, useRef } from 'react';
import { useFirebaseServices, useNetworkStatus } from '@library/hooks';

import type { AxiosResponse, AxiosRequestConfig } from 'axios';
import type { BaseAxios, BaseError, Config, OnSuccess } from '../type';

// Cache for deduplicating concurrent requests
const requestCache = new Map<string, Promise<any>>();

const createCacheKey = (url: string, data?: any): string => {
  return `${url}:${JSON.stringify(data)}`;
};

function useBaseAxios<Data>(url: string): BaseAxios<Data>;
function useBaseAxios<Data>(config: Config<Data>): BaseAxios<Data>;
function useBaseAxios<Data>(url: string, config: Config<Data>): BaseAxios<Data>;
function useBaseAxios<Data>(param1: string | Config<Data>, param2: Config<Data> = {}) {
  const isMounted = useMountedState();
  const handleError = useErrorHandler();
  const isConnected = useNetworkStatus();
  const { logEvent } = useFirebaseServices();
  const abortControllerRef = useRef<AbortController>();

  const [{ data, error, loading }, dispatch] = useAxiosReducer<Data>(typeof param1 === 'string' ? param2.ssrData : param1.ssrData);

  // Memoize the configuration
  const config = useMemo(() => {
    if (typeof param1 === 'string') {
      const { axiosInstance = base_api, additionalUrl = '', ...rest } = param2;
      return { url: param1, axiosInstance, additionalUrl, ...rest };
    }
    const { axiosInstance = base_api, additionalUrl = '', ...rest } = param1;
    return { axiosInstance, additionalUrl, ...rest };
  }, [param1, param2]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const getData = useCallback(
    async (lazyData?: Config<Data>['data'], onSuccess?: OnSuccess<Data>, lazyConfig?: Config<Data>) => {
      if (!isConnected) {
        const networkError = new Error('No internet connection');
        dispatch({ type: 'REQUEST_FAILED', payload: networkError });
        return;
      }

      const url =
        typeof param1 === 'string'
          ? param1 + (lazyConfig?.additionalUrl || config.additionalUrl)
          : (config.url || lazyConfig?.url || '') + (lazyConfig?.additionalUrl || config.additionalUrl);

      const cacheKey = createCacheKey(url, lazyData || config.data);

      // Check if there's an existing request in progress
      const existingRequest = requestCache.get(cacheKey);
      if (existingRequest) {
        return existingRequest;
      }

      dispatch({ type: 'REQUEST_INIT' });
      logEvent('backend_call_initiated', { url });

      // Create new AbortController for this request
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      const requestConfig: AxiosRequestConfig = {
        ...config,
        ...lazyConfig,
        data: lazyData || config.data,
        signal: abortControllerRef.current.signal,
      };

      const request = (async () => {
        try {
          const res = (await (typeof param1 === 'string'
            ? config.axiosInstance(url, requestConfig)
            : config.axiosInstance({ ...requestConfig, url }))) as AxiosResponse<Data>;

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

          const err = handleError(e as BaseError<Data>, `Error in useBaseAxios with URL: ${url}`, lazyConfig?.hideErrors);
          dispatch({ type: 'REQUEST_FAILED', payload: err });
          throw err;
        } finally {
          requestCache.delete(cacheKey);
        }
      })();

      requestCache.set(cacheKey, request);
      return request;
    },
    [isConnected, config],
  );

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  return [getData, { cancel, data, error, loading, refetch: getData }];
}

export default useBaseAxios;
