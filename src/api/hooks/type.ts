import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export type BaseError<Data> = Error & { response?: AxiosResponse<Data> };

export interface RequestState<Data> {
  data: Data | undefined;
  loading: boolean;
  error: BaseError<Data> | undefined;
}

export type Action<Data> =
  | { type: 'REQUEST_INIT' }
  | { type: 'REQUEST_SUCCESS'; payload: Data }
  | { type: 'REQUEST_FAILED'; payload: BaseError<Data> };

export type RequestMethod = 'get' | 'delete' | 'head' | 'post' | 'put' | 'patch';

export interface RequestFunctions {
  cancel: () => void;
  refetch: () => Promise<void>;
}

export interface Config<Data> extends AxiosRequestConfig {
  axiosInstance?: AxiosInstance;
  ssrData?: Data;
  method?: RequestMethod;
  additionalUrl?: string;
  hasFinalUrl?: boolean;
  hideErrors?: boolean;
}

export type OnSuccess<Data> = (arg: Data, status: number, finalUrl?: string) => void;

export type GetData<Data> = (
  lazyData?: Config<Data>['data'],
  onSuccess?: OnSuccess<Data>,
  lazyConfig?: Config<Data>,
) => Promise<Data | undefined>;

export type BaseAxiosProps<Data> = RequestState<Data> & RequestFunctions;
export type BaseAxios<Data> = [GetData<Data>, BaseAxiosProps<Data>];
