import { lead_api } from '@api/base';

import { useMount } from 'react-use';
import { useMemo, useState } from 'react';
import { useTranslation } from '@library/hooks';
import { useAxios, useLazyAxios } from '@api/hooks';
import { setAppSubscription, useAppStore } from '@store/app';
import { useLastInquiryService } from '@services/last-inquiry';

import { differenceInDays, format, isAfter } from 'date-fns';

import type { LoanApiResponse } from '@typings/responses/loan';
import type { CreditReportQualityApiResponse, ISubscription } from '@typings/responses';
import type { LoanFormFields } from '@modules/logged-in/screens/own-data-check/new-credit/loan-form/resolver';

const useNewCredit = () => {
  const { t } = useTranslation();
  const { user, subscription } = useAppStore(state => state);
  const [showLoanModal, setShowLoanModal] = useState<boolean>(false);
  const [loanResponse, setLoanResponse] = useState<LoanApiResponse | null>(null);

  const userAccountId = user?.accounts[0].accountId || subscription?.subscriptionAccounts?.[0].accountId;

  const { data, loading, refetch } = useAxios<CreditReportQualityApiResponse>('/credit-report-quality?subscriptionFreeAccess=true', {
    method: 'post',
    headers: {
      'User-Account-Id': userAccountId || 114,
      'Subscription-Id': subscription?.id || 60,
    },
  });

  const [call, { loading: loanFormLoading, error }] = useLazyAxios<LoanApiResponse>('/applications', {
    method: 'post',
    axiosInstance: lead_api,
  });

  const { fetchInquiryReport } = useLastInquiryService(false);

  const isTrialSubscription = subscription?.trial;

  const isPositive = data?.creditReportQualityType === 'POSITIVE';

  const isSubscriptionValid = useMemo(() => {
    if (!subscription) return false;
    if (!subscription.subscriptionAccounts) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const termDate = new Date(subscription.subscriptionAccounts[0].termDateTime);
    termDate.setHours(0, 0, 0, 0);

    return !subscription.trial && isAfter(termDate, today);
  }, [subscription]);

  const onSubmitLoan = async (args: LoanFormFields) => {
    const body = {
      identityNumber: data?.identityNumber,
      resident: true,
      leadInfo: {
        subjectType: 'INDIVIDUAL',
        requestReason: 'CREDIT_FOR_INDIVIDUAL',
        requestBasis: data?.reportId,
        requestDate: new Date(),
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
    await call(body, setLoanResponse, { hideErrors: true }).then(() => {
      setShowLoanModal(true);
    });
    await fetchInquiryReport();
  };

  const getLoanResponseType = useMemo(() => {
    if (error && error?.response) {
      const { status, data } = error.response;
      if (typeof data === 'number') return;
      const { lastLeadDate, expirationDate, lastLeadId } = data;

      if (status === 409) {
        setShowLoanModal(true);
        const days = differenceInDays(new Date(), new Date(lastLeadDate));
        if (days <= 2) {
          return {
            text: t('logged_in:credit_report:new:sheets:request_pending'),
            type: 'pending',
          };
        } else if (days > 2) {
          return {
            text: t('logged_in:credit_report:new:sheets:request_duplicate', { date: expirationDate, id: lastLeadId }),
            type: 'duplicate',
          };
        }
      }
    }
    if (loanResponse && typeof loanResponse === 'number') {
      return {
        text: t('logged_in:credit_report:new:sheets:request_success', { id: loanResponse }),
        type: 'success',
      };
    }
  }, [loanResponse, error]);

  return {
    data,
    loading,
    isPositive,
    showLoanModal,
    loanFormLoading,
    getLoanResponseType,
    isTrialSubscription,
    isSubscriptionValid,
    fns: {
      refetch,
      onSubmitLoan,
      setShowLoanModal,
    },
  };
};

export default useNewCredit;
