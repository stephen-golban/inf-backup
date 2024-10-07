import React from 'react';

import useWhoCheckedCredit from './hooks';

import { NewCreditModule } from '@modules/logged-in';

import { LOGGED_IN_SCREENS, OWN_DATA_CHECK_SCREENS, SUBSCRIPTIONS_SCREENS, type OwnDataCheckScreenProps } from '@typings/navigation';
import { format } from 'date-fns';

const NewCredit: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.NewCredit>> = ({ navigation }) => {
  const { data, loading, loanFormLoading, refetch, onSubmitLoan, isSubscriptionValid, isPositive } = useWhoCheckedCredit();

  const onPressDownload = () => {
    if (isSubscriptionValid) {
      return navigation.navigate(OWN_DATA_CHECK_SCREENS.DownloadReport, {
        id: data?.reportId || 0,
        generationDateTime: format(data?.responseDateTime || new Date(), 'dd/MM/yyyy'),
      });
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
