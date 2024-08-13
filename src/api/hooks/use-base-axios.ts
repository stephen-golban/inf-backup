import { base_api } from '../base';
import useAxiosCancel from './use-axios-cancel';
import { useEffect, useCallback } from 'react';
import { useToast } from 'react-native-toast-notifications';
import useAxiosReducer, { type RequestState } from './use-axios-reducer';
import { useMountedState } from 'react-use';

import type { RequestMethod } from './type';
import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

interface RequestFunctions {
  cancel: () => void;
  refetch: () => Promise<void>;
}

export interface Config<Data> extends AxiosRequestConfig {
  axiosInstance?: AxiosInstance;
  ssrData?: Data;
  method?: RequestMethod;
  additionalUrl?: string;
}

export type OnSuccess<Data> = (arg: Data) => void;

export type GetData<Data> = (
  lazyData?: Config<Data>['data'],
  onSuccess?: OnSuccess<Data>,
  lazyConfig?: Config<Data>,
) => Promise<Data | undefined>;

export type Props<Data> = RequestState<Data> & RequestFunctions;
export type BaseAxios<Data> = [GetData<Data>, Props<Data>];

function useBaseAxios<Data>(url: string): BaseAxios<Data>;
function useBaseAxios<Data>(config: Config<Data>): BaseAxios<Data>;
function useBaseAxios<Data>(url: string, config: Config<Data>): BaseAxios<Data>;
function useBaseAxios<Data>(param1: string | Config<Data>, param2: Config<Data> = {}) {
  const toast = useToast();
  const isMounted = useMountedState();
  const [{ data, error, loading }, dispatch] = useAxiosReducer<Data>(typeof param1 === 'string' ? param2.ssrData : param1.ssrData);
  const { cancel, cancelToken } = useAxiosCancel();

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
      dispatch({ type: 'REQUEST_INIT' });

      try {
        const res = (await invokeAxios(lazyData, lazyConfig)) as AxiosResponse<Data>;

        if (isMounted()) {
          dispatch({ type: 'REQUEST_SUCCESS', payload: res.data });
          if (onSuccess && res.data) {
            onSuccess(res.data);
          }
          return res.data;
        }
      } catch (e) {
        if (isMounted()) {
          const errResMessage = (e as any).response?.data?.message;
          if (errResMessage) {
            toast.show(errResMessage, { type: 'danger' });
          } else {
            if (__DEV__) {
              toast.show((e as any).message, { type: 'danger' });
            }
          }
          dispatch({ type: 'REQUEST_FAILED', payload: e as Error });
        }
      }
    },
    [cancelToken, `${JSON.stringify(param1)}.${JSON.stringify(param2)}`],
  );

  useEffect(() => {
    return () => {
      cancel();
    };
  }, []);

  return [getData, { cancel, data, error, loading, refetch: getData }];
}

export default useBaseAxios;
