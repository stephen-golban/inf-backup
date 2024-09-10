import { useEffect, useRef } from 'react';
import useBaseAxios from './use-base-axios';

import type { BaseAxiosProps, Config } from './type';

function useAxios<Data>(url: string): BaseAxiosProps<Data>;
function useAxios<Data>(config: Config<Data>): BaseAxiosProps<Data>;
function useAxios<Data>(url: string, config: Config<Data>): BaseAxiosProps<Data>;
function useAxios<Data>(param1: string | Config<Data>, param2: Config<Data> = {}) {
  const invokeUseBaseAxios = typeof param1 === 'string' ? () => useBaseAxios<Data>(param1, param2) : () => useBaseAxios<Data>(param1);

  const config =
    typeof param1 === 'string'
      ? {
          ...param2,
          url: param1,
        }
      : param1;

  const [getData, dataStates] = invokeUseBaseAxios();

  const justMounted = useRef(true);

  useEffect(() => {
    if (typeof config.ssrData === 'undefined' || !justMounted.current) {
      getData();
    }

    justMounted.current = false;
  }, [JSON.stringify(config)]);

  return dataStates;
}

export default useAxios;
