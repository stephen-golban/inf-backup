import React from 'react';

import { format } from 'date-fns';
import useWhoCheckedCredit from './hooks';

import { NewCreditModule } from '@modules/logged-in';
import { BottomSheet, Text, View } from '@components/common';

import type { I18nKey } from '@translations/locales';
import { LOGGED_IN_SCREENS, OWN_DATA_CHECK_SCREENS, SUBSCRIPTIONS_SCREENS, type OwnDataCheckScreenProps } from '@typings/navigation';

const NewCredit: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.NewCredit>> = ({ navigation }) => {
  const { data, loading, loanFormLoading, getStatusText, isSubscriptionValid, isPositive, loanResStatus, fns } = useWhoCheckedCredit();

  const onPressDownload = () => {
    if (isSubscriptionValid) {
      if (data) {
        return navigation.navigate(OWN_DATA_CHECK_SCREENS.DownloadReport, {
          id: data.reportId,
          generationDateTime: format(data.responseDateTime, 'MM/dd/yyyy'),
        });
      }
    }
    return navigation.navigate(LOGGED_IN_SCREENS.SUBSCRIPTIONS, { screen: SUBSCRIPTIONS_SCREENS.INDEX });
  };

  return (
    <>
      <NewCreditModule
        loading={loading}
        onRefresh={fns.refetch}
        isPositive={isPositive}
        onSubmitLoan={fns.onSubmitLoan}
        loanFormLoading={loanFormLoading}
        onPressDownload={onPressDownload}
        isSubscriptionValid={isSubscriptionValid}
      />
      <BottomSheet isVisible={!!loanResStatus} onDismiss={() => fns.setLoanResStatus(null)}>
        <View>
          <Text t18n={getStatusText as I18nKey} />
        </View>
      </BottomSheet>
    </>
  );
};

export { NewCredit };
