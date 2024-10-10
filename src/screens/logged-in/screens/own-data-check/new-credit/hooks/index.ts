import { useMemo, useState } from 'react';
import { lead_api } from '@api/base';
import { useAppStore } from '@store/app';
import { differenceInDays, format, isAfter } from 'date-fns';
import { useTranslation, useTryCatch } from '@library/hooks';
import { useAxios, useLazyAxios } from '@api/hooks';

import type { CreditReportQualityApiResponse } from '@typings/responses';
import type { LoanFormFields } from '@modules/logged-in/screens/own-data-check/new-credit/loan-form/resolver';

const useNewCredit = () => {
  const { t } = useTranslation();
  const { user, subscription } = useAppStore(state => state);
  const [loanResStatus, setLoanResStatus] = useState<[any, number] | null>(null);

  const userAccountId = user?.accounts[0].accountId || subscription?.subscriptionAccounts[0].accountId;

  const { data, loading, refetch } = useAxios<CreditReportQualityApiResponse>('/credit-report-quality?subscriptionFreeAccess=true', {
    method: 'post',
    headers: {
      'User-Account-Id': userAccountId || 114,
      'Subscription-Id': subscription?.id || 60,
    },
  });

  const [call, { loading: loanFormLoading }] = useLazyAxios('/applications', { method: 'post', axiosInstance: lead_api });

  const isPositive = data?.creditReportQualityType === 'POSITIVE';

  const isSubscriptionValid = useMemo(() => {
    if (!subscription) return false;

    const today = new Date().setHours(0, 0, 0, 0);
    const termDate = new Date(subscription.subscriptionAccounts[0].termDateTime);

    return !subscription.trial && isAfter(termDate, today);
  }, [subscription]);

  const onSubmitLoan = useTryCatch(async (args: LoanFormFields) => {
    const body = {
      identityNumber: data?.identityNumber,
      resident: true,
      leadInfo: {
        subjectType: 'INDIVIDUAL',
        requestReason: 'CREDIT_FOR_INDIVIDUAL',
        requestBasis: data?.reportId,
        requestDate: format(new Date(), 'yyyy-MM-dd'),
        requestAmount: args.sliderValue,
        requestCurrency: 'MDL',
        creditDuration: args.term.value,
        state: 'NOTPROCESSED',
      },
      individual: {
        subjectFirstName: data?.firstName,
        subjectLastName: data?.lastName,
        subjectBdate: format(data?.birthDate || new Date(), 'yyyy-MM-dd'),
      },
      county: 1,
      contact: {
        phones: [args.phone.value],
      },
      agreement: true,
      partnersDebts: data?.partnersDebts,
      creditReportQuality: data?.creditReportQualityType,
      otherActiveNegativeCommitments: data?.otherActiveNegativeCommitments,
    };
    return await call(body, (res, status) => setLoanResStatus([res, status]));
  });

  const getStatusText = useMemo(() => {
    const [res, status] = loanResStatus || [];
    if (status === 200 || status === 201) {
      return t('logged_in:credit_report:new:sheets:request_success', { id: res.id });
    }
    if (status === 409 && res.lastLeadDate) {
      const formattedDate = format(res.lastLeadDate, 'MM/dd/yyyy');
      const days = differenceInDays(new Date(), new Date(res.lastLeadDate));
      if (days <= 2) {
        return t('logged_in:credit_report:new:sheets:request_pending', { date: formattedDate, id: res.id });
      } else if (days > 2) {
        return t('logged_in:credit_report:new:sheets:request_duplicate', { date: formattedDate, id: res.id });
      }
    }
  }, [loanResStatus]);

  return {
    data,
    loading,
    isPositive,
    getStatusText,
    loanResStatus,
    loanFormLoading,
    isSubscriptionValid,
    fns: {
      refetch,
      onSubmitLoan,
      setLoanResStatus,
    },
  };
};

export default useNewCredit;
