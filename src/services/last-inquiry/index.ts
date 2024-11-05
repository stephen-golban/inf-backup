import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useAppDataCheckStore } from '@store/data-check';

import type { LastInquiryApiResponse } from '@typings/responses';

function useLastInquiryService(runOnMount = false) {
  const [call, { loading: loadingInquiry }] = useLazyAxios<LastInquiryApiResponse>('/inquiry-report', { method: 'get' });
  const fetchInquiryReport = useTryCatch(async () => await call(undefined, res => useAppDataCheckStore.setState({ inquiry: res })));

  useMount(() => runOnMount && fetchInquiryReport());

  return { fetchInquiryReport, loadingInquiry };
}

export { useLastInquiryService };
