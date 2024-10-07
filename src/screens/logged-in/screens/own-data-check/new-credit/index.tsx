import React from 'react';

import useWhoCheckedCredit from './hooks';

import { NewCreditModule } from '@modules/logged-in';

import {
  LOGGED_IN_SCREENS,
  OWN_DATA_CHECK_SCREENS,
  PAYMENT_SCREENS,
  SUBSCRIPTIONS_SCREENS,
  type OwnDataCheckScreenProps,
} from '@typings/navigation';

const NewCredit: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.NewCredit>> = ({ navigation }) => {
  const { loading, loanFormLoading, refetch, onSubmitLoan, isSubscriptionValid, isPositive } = useWhoCheckedCredit();

  const onPressDownload = () => {
    if (isSubscriptionValid) {
      return navigation.navigate(LOGGED_IN_SCREENS.PAYMENT, { screen: PAYMENT_SCREENS.ORDER });
    }
    return navigation.navigate(LOGGED_IN_SCREENS.SUBSCRIPTIONS, { screen: SUBSCRIPTIONS_SCREENS.INDEX });
  };

  return (
    <NewCreditModule
      loading={loading}
      onRefresh={refetch}
      isPositive={isPositive}
      onSubmitLoan={onSubmitLoan}
      loanFormLoading={loanFormLoading}
      onPressDownload={onPressDownload}
      isSubscriptionValid={isSubscriptionValid}
    />
  );
};

export { NewCredit };
