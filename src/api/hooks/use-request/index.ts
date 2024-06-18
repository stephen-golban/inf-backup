import useSWR from 'swr';
import { fetcher } from 'api';
import { createSwrConfig } from './util';

import type { Config, Method, RequestConfig, Return, AxiosResponse, AxiosError } from './type';

function useRequest<Data = unknown, Error = unknown>(
  url: string,
  method: Method = 'GET',
  axiosConfig?: RequestConfig,
  swrConfig: Config<Data, Error> = {},
): Return<Data, Error> {
  const swr = useSWR<AxiosResponse<Data>, AxiosError<Error>>([url, method, axiosConfig], fetcher, createSwrConfig(swrConfig, axiosConfig));
  const { error, mutate, isLoading, isValidating, data: response } = swr;

  return {
    error,
    mutate,
    response,
    isLoading,
    isValidating,
    data: response && response.data,
  };
}

export { useRequest };
