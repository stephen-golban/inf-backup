import React from 'react';

import { useTheme } from '@theme/index';
import useWhoCheckedCredit from './hooks';
import { useAppDataCheckStore } from '@store/data-check';

import { NewCreditModule } from '@modules/logged-in';
import { Avatar, BottomSheet, Image, Text, View } from '@components/common';

import { LOGGED_IN_SCREENS, OWN_DATA_CHECK_SCREENS, SUBSCRIPTIONS_SCREENS, type OwnDataCheckScreenProps } from '@typings/navigation';

const NewCredit: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.NewCredit>> = ({ navigation }) => {
  const { colors } = useTheme();
  const inquiry = useAppDataCheckStore(state => state.inquiry);
  const { loading, loanFormLoading, getLoanResponseType, isSubscriptionValid, isPositive, showLoanModal, fns } = useWhoCheckedCredit();

  const onPressDownload = () => {
    if (isSubscriptionValid && inquiry) {
      return navigation.navigate(OWN_DATA_CHECK_SCREENS.DownloadReport, {
        id: inquiry.basicServices.creditReportId,
      });
    }
    return navigation.navigate(LOGGED_IN_SCREENS.SUBSCRIPTIONS, { screen: SUBSCRIPTIONS_SCREENS.INDEX });
  };

  const imageSource = React.useMemo(() => {
    if (getLoanResponseType) {
      const { type } = getLoanResponseType;
      if (type === 'pending') return require('@assets/images/loan_pending.png');
      if (type === 'duplicate') return require('@assets/images/loan_duplicate.png');
      if (type === 'success') return require('@assets/images/loan_success.png');
    }
    return;
  }, [getLoanResponseType]);

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
      <BottomSheet
        isVisible={showLoanModal}
        onDismiss={() => fns.setShowLoanModal(false)}
        snapPoints={['35%']}
        backgroundStyle={{ backgroundColor: colors.lightBlue }}>
        {getLoanResponseType && (
          <View fill px="lg">
            {imageSource && (
              <Avatar.Base alignSelf="center" size={150}>
                <Image source={imageSource} />
              </Avatar.Base>
            )}
            <Text variant="16-mid" text={getLoanResponseType.text} color="gray_4d" />
          </View>
        )}
      </BottomSheet>
    </>
  );
};

export { NewCredit };
