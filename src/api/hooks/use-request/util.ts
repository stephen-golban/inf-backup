import { AxiosResponse, Config, RequestConfig } from './type';

function createSwrConfig<Data = unknown, Error = unknown>(config: Config<Data, Error>, request?: RequestConfig) {
  return {
    ...config,
    fallbackData:
      config.fallbackData &&
      ({
        status: 200,
        headers: {},
        config: request!,
        data: config.fallbackData,
        statusText: 'InitialData',
      } as AxiosResponse<Data>),
  };
}

export { createSwrConfig };
