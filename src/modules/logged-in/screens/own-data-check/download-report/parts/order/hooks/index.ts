import { useMemo } from 'react';
import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useTranslation, useTryCatch } from '@library/hooks';
import { chain, findKey, isEmpty } from 'lodash';

import type { ReportRequestFormFields } from '../resolver';
import { useToast } from 'react-native-toast-notifications';

export default function useDownloadReportOrder() {
  const toast = useToast();
  const { t } = useTranslation();
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
    const stamped = rest.originalStampedReport && '- Original stamped Credit Report<br/>';
    const apostilled = rest.translatedApostilledReport && '- Translated and apostilled Credit Report<br/>';
    const translated = rest.originalTranslatedReport && '- Original translated Credit Report<br/>';
    const body = {
      message: `Credit Report Order, <br/>
      Order type:<br/>
      ${stamped}
      ${apostilled}
      ${translated}
      Order phone:<br/>
      ${phone.value}`,
    };
    await call(body, () => toast.show(t('ui:success'), { type: 'success' }));
  });

  return { onSubmit, loading, generatedPhones };
}
