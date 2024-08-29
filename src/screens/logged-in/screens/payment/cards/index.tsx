import React from 'react';

import { useGoBack } from '@library/hooks';

import { PaymentCardsModule } from '@modules/logged-in';

import { PAYMENT_SCREENS, PaymentStackScreenProps } from '@typings/navigation';

const PaymentCardsScreen: React.FC<PaymentStackScreenProps<PAYMENT_SCREENS.CARDS>> = ({ navigation }) => {
  useGoBack(true, navigation.goBack);

  const onPressContinue = (billerId: string) => {
    if (billerId) {
      navigation.navigate(PAYMENT_SCREENS.ORDER, { billerId });
    }
  };

  return <PaymentCardsModule onPressContinue={onPressContinue} />;
};

export { PaymentCardsScreen };
