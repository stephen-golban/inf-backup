import { BaseAxios, Config } from './type';
import useBaseAxios from './base-axios';

function useLazyAxios<Data>(url: string): BaseAxios<Data>;
function useLazyAxios<Data>(config: Config<Data>): BaseAxios<Data>;
function useLazyAxios<Data>(url: string, config: Config<Data>): BaseAxios<Data>;
function useLazyAxios<Data>(param1: string | Config<Data>, param2: Config<Data> = {}) {
  if (typeof param1 === 'string') {
    return useBaseAxios<Data>(param1, param2);
  }

  return useBaseAxios<Data>(param1);
}

export default useLazyAxios;
