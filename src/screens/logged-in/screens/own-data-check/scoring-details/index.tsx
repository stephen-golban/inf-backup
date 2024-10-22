import React from 'react';

import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useCreditScoreService } from '@services/credit-score';

import { BottomSheet } from '@components/common';
import { useAppDataCheckStore } from '@store/data-check';
import { useExecutePaymentService } from '@services/execute-payment';
import { PaymentCardsModule, ScoringDetailsModule } from '@modules/logged-in';

import { LastInquiryApiResponse } from '@typings/responses';
import { LOGGED_IN_SCREENS, OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps } from '@typings/navigation';

const ScoringDetailsScreen: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.ScoringDetails>> = ({ navigation }) => {
  const { creditScore, fetchScore, loading: loadingCreditScore } = useCreditScoreService(false);
  const subscription = useAppStore(state => state.subscription);

  const [toggleBottomSheet, setToggleBottomSheet] = React.useState<boolean>(false);

  const paymentService = useExecutePaymentService();

  const amount = subscription?.servicesAccesses.find(service => service.service === 'CreditScore')?.prices[0].price;

  const onPayReport = () => {
    setToggleBottomSheet(true);
  };

  const { reportEvents } = useAppDataCheckStore(state => state);

  return (
    <>
      <ScoringDetailsModule
        creditReportEvents={reportEvents}
        navigation={navigation}
        subscription={subscription}
        score={creditScore?.scoreValue}
        loading={loadingCreditScore}
        onPressUpdate={async () => {
          await fetchScore();
        }}
        onPayReport={onPayReport}
      />
      <BottomSheet
        isVisible={toggleBottomSheet}
        onDismiss={() => {
          setToggleBottomSheet(false);
        }}
        snapPoints={['75%']}>
        <PaymentCardsModule
          paymentLoading={paymentService.loading || loadingCreditScore}
          onPressContinue={({ cardId, billerId }) => {
            const queryData = {
              paymentServiceName: 'MAIB',
              purchasedServiceName: 'CREDIT_SCORE',
              cardId,
              billerId,
              amount,
              currency: 'MDL',
            };
            return paymentService.onPressPay(queryData, async res => {
              await fetchScore();
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

export { ScoringDetailsScreen };
