import { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface RequestState<Data> {
  data: Data | undefined;
  loading: boolean;
  error: Error | undefined;
}

export type Action<Data> =
  | { type: 'REQUEST_INIT' }
  | { type: 'REQUEST_SUCCESS'; payload: Data }
  | { type: 'REQUEST_FAILED'; payload: Error };

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
}

export type OnSuccess<Data> = (arg: Data, status: number) => void;

export type GetData<Data> = (
  lazyData?: Config<Data>['data'],
  onSuccess?: OnSuccess<Data>,
  lazyConfig?: Config<Data>,
) => Promise<Data | undefined>;

export type BaseAxiosProps<Data> = RequestState<Data> & RequestFunctions;
export type BaseAxios<Data> = [GetData<Data>, BaseAxiosProps<Data>];
