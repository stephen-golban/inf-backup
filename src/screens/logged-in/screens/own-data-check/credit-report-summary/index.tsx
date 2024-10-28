import React from 'react';

import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useAppDataCheckStore } from '@store/data-check';
import { useCreditReportSummaryService } from '@services/credit-report-summary';

import { CreditReportSummaryModule, PaymentCardsModule } from '@modules/logged-in';

import { BottomSheet } from '@components/common';
import { useExecutePaymentService } from '@services/execute-payment';

import { LOGGED_IN_SCREENS, OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps } from '@typings/navigation';

const CreditReportSummaryScreen: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.CreditReportSummary>> = ({ navigation }) => {
  const report = useAppDataCheckStore(state => state.creditReportSummary);
  const reportId = useAppDataCheckStore(state => state.inquiry?.basicServices.creditReportSummaryId);

  const { fetchCreditReport, loadingReport } = useCreditReportSummaryService();

  const [toggleBottomSheet, setToggleBottomSheet] = React.useState<boolean>(false);

  const paymentService = useExecutePaymentService();

  const subscription = useAppStore(state => state.subscription);

  const amount = subscription?.servicesAccesses.find(service => service.service === 'CreditScore')?.prices[0].price;

  const [call, { loading }] = useLazyAxios({
    method: 'post',
    url: `/feedback/credit-report`,
  });

  function onOrderReport() {
    if (reportId) {
      navigation.navigate(OWN_DATA_CHECK_SCREENS.DownloadReport, {
        id: reportId,
        generationDateTime: report?.responseDateTime as any,
      });
    }
  }

  const onPayReport = () => {
    setToggleBottomSheet(true);
  };

  return (
    <>
      <CreditReportSummaryModule
        onPressUpdate={async () => {
          fetchCreditReport();
        }}
        onPayReport={onPayReport}
        navigation={navigation}
        subscription={subscription}
        onSubmit={data => call({ ...data })}
        data={report}
        loadReport={loadingReport}
        feedbackLoading={loading}
        onOrderReport={onOrderReport}
      />
      <BottomSheet
        isVisible={toggleBottomSheet}
        onDismiss={() => {
          setToggleBottomSheet(false);
        }}
        snapPoints={['75%']}>
        <PaymentCardsModule
          paymentLoading={loadingReport || paymentService.loading}
          onPressContinue={({ cardId, billerId }) => {
            const queryData = {
              paymentServiceName: 'MAIB',
              purchasedServiceName: 'CREDIT_REPORT_SUMMARY',
              cardId,
              billerId,
              amount,
              currency: 'MDL',
            };
            return paymentService.onPressPay(queryData, async res => {
              await fetchCreditReport();
              navigation.navigate(LOGGED_IN_SCREENS.OWN_DATA_CHECK, {
                screen: OWN_DATA_CHECK_SCREENS.SummaryReportStatus,
                params: { status: res.status === 'OK' ? 'accepted' : 'rejected' },
              });
              setToggleBottomSheet(false);
            });
          }}
          hasAutomaticTermExtension
        />
      </BottomSheet>
    </>
  );
};

export { CreditReportSummaryScreen };
