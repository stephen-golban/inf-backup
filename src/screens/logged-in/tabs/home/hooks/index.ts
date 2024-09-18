import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { useAppDataCheckStore } from '@store/data-check';

import type { LastInquiryApiResponse } from '@typings/responses';

const useHomeScreen = () => {
  const [call, { refetch, loading }] = useLazyAxios<LastInquiryApiResponse>('/inquiry-report', { method: 'get' });

  useMount(async () => await call(undefined, res => useAppDataCheckStore.setState({ inquiry: res })));

  return { refetch, loading };
};

export default useHomeScreen;
