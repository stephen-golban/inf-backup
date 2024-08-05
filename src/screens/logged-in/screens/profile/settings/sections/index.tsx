import React from 'react';

import { useGoBack } from '@library/hooks';

import { SettingsSectionsModule } from '@modules/logged-in';

import { SETTINGS_SCREENS, SettingsStackScreenProps } from '@typings/navigation';

const Sections: React.FC<SettingsStackScreenProps<SETTINGS_SCREENS.SECTIONS>> = ({ navigation }) => {
  useGoBack(true, navigation.goBack);

  return <SettingsSectionsModule onPressPaymentHistory={() => navigation.navigate(SETTINGS_SCREENS.PAYMENTS_HISTORY)} />;
};

export { Sections };
