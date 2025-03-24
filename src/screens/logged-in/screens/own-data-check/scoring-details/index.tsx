import React from 'react';

import { useCreditScoreService } from '@services/credit-score';
import { useGetSubscription } from '@services/subscription/get';

import { BottomSheet } from '@components/common';
import { useAppDataCheckStore } from '@store/data-check';
import { useExecutePaymentService } from '@services/execute-payment';
import { PaymentCardsModule, ScoringDetailsModule } from '@modules/logged-in';

import { LOGGED_IN_SCREENS, OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps } from '@typings/navigation';
import { isIos, openBrowserAuthAsync } from '@library/method';
import { useRevenueCat } from '@providers/revenue-cat';

const ScoringDetailsScreen: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.ScoringDetails>> = ({ navigation }) => {
  const { creditScore, fetchScore, loading: loadingCreditScore } = useCreditScoreService(false);
  const { subscription, loading: subscriptionLoading } = useGetSubscription(true);
  const { onOneTimePurchase, isLoading } = useRevenueCat();

  const [toggleBottomSheet, setToggleBottomSheet] = React.useState<boolean>(false);

  const paymentService = useExecutePaymentService();

  const amount = subscription?.servicesAccesses?.find(service => service.service === 'CreditScore')?.prices[0]?.price;

  const onPayReport = async(withoutBottomSheet?: boolean) => {
    if (isIos) {
      return await onOneTimePurchase(async () => {
        await fetchScore();
        navigation.navigate(LOGGED_IN_SCREENS.OWN_DATA_CHECK, {
          screen: OWN_DATA_CHECK_SCREENS.SummaryReportStatus,
          params: { status: 'accepted' },
        });
      });
    }else {

      if (withoutBottomSheet) {
        const queryData = {
        paymentServiceName: 'MAIB',
        purchasedServiceName: 'CREDIT_SCORE',
        cardId: 0,
        amount,
        currency: 'MDL',
      };
      return paymentService.onPressPay(queryData as any, async res => {
        if (res.payUrl) {
          const response = await openBrowserAuthAsync(res.payUrl, '');
          if (response && response.type === 'success') {
            await fetchScore();
            await paymentService.onCallbackPayment(res.payId);
            navigation.navigate(LOGGED_IN_SCREENS.OWN_DATA_CHECK, {
              screen: OWN_DATA_CHECK_SCREENS.SummaryReportStatus,
              params: { status: res.status === 'OK' ? 'accepted' : 'rejected' },
            });
          }
        }
      });
    }
    return setToggleBottomSheet(true);
  }
  };

  const { reportEvents } = useAppDataCheckStore(state => state);

  return (
    <>
      <ScoringDetailsModule
        creditReportEvents={reportEvents}
        navigation={navigation}
        subscription={subscription}
        score={creditScore?.scoreValue}
        onPayReportLoading={paymentService.loading}
        loading={loadingCreditScore || subscriptionLoading || isLoading}
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
