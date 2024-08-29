import React from 'react';

import { PaymentsManagementModule } from '@modules/logged-in';

import { SETTINGS_SCREENS, SettingsStackScreenProps } from '@typings/navigation';

const PaymentsManagement: React.FC<SettingsStackScreenProps<SETTINGS_SCREENS.PAYMENTS_MANAGEMENT>> = () => {
  return <PaymentsManagementModule />;
};

export { PaymentsManagement };
