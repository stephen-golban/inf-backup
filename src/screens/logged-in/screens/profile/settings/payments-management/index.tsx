import React from 'react';

import { useGoBack } from '@library/hooks';

import { PaymentsManagementModule } from '@modules/logged-in';

import { SETTINGS_SCREENS, SettingsStackScreenProps } from '@typings/navigation';

const PaymentsManagement: React.FC<SettingsStackScreenProps<SETTINGS_SCREENS.PAYMENTS_MANAGEMENT>> = ({ navigation }) => {
  useGoBack(true, navigation.goBack);
  return <PaymentsManagementModule />;
};

export { PaymentsManagement };
