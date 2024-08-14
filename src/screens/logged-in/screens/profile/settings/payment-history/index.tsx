import React from 'react';

import { PaymentHistoryModule } from '@modules/logged-in';

import { SETTINGS_SCREENS, SettingsStackScreenProps } from '@typings/navigation';

const PaymentHistory: React.FC<SettingsStackScreenProps<SETTINGS_SCREENS.PAYMENTS_HISTORY>> = () => {
  return <PaymentHistoryModule />;
};

export { PaymentHistory };
