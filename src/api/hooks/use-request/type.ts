import { SWRConfiguration, SWRResponse } from 'swr';
import { Method, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

type RequestConfig = Omit<AxiosRequestConfig, 'method' | 'url'> | null;

interface Return<Data, Error>
  extends Pick<SWRResponse<AxiosResponse<Data>, AxiosError<Error>>, 'isValidating' | 'error' | 'mutate' | 'isLoading'> {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

interface Config<Data = unknown, Error = unknown> extends Omit<SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>, 'fallbackData'> {
  fallbackData?: Data;
}

export type { RequestConfig, Return, Config, Method, AxiosResponse, AxiosError };
