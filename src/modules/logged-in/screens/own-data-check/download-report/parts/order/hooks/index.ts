import { useMemo } from 'react';
import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { chain, findKey, isEmpty } from 'lodash';

import type { ReportRequestFormFields } from '../resolver';

export default function useDownloadReportOrder() {
  const user = useAppStore(state => state.user);

  const [call, { loading }] = useLazyAxios('feedback?type=CREDIT_REPORT_OFFICIAL', { method: 'post' });

  const generatedPhones = useMemo(() => {
    if (!user || isEmpty(user.contactData)) return [];

    return chain(user.contactData)
      .filter({ type: 'PHONE' })
      .map(({ value }) => ({ value, label: value }))
      .value();
  }, [user]);

  const onSubmit = useTryCatch(async (data: ReportRequestFormFields) => {
    const { phone, termsAgreement, ...rest } = data;
    const body = {
      message: findKey(rest, value => value === true) || '',
    };
    await call(body);
  });

  return { onSubmit, loading, generatedPhones };
}
