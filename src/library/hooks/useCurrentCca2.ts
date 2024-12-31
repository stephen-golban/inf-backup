import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { setAppCca2, useAppStore } from '@store/app';

import type { CountryCode } from 'libphonenumber-js';

export default function useCurrentCca2() {
  const cca2 = useAppStore(state => state.cca2);

  const [call, { loading }] = useLazyAxios('https://ipapi.co/json', { baseURL: '' });

  useMount(async () => await call(undefined, res => setAppCca2(res as CountryCode)));

  return { cca2, loading };
}
