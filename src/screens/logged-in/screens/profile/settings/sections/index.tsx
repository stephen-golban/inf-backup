import React from 'react';

import { useAppStore } from '@store/app';
import { useGoBack } from '@library/hooks';
import { openBrowserAsync } from '@library/method';

import { SettingsSectionsModule } from '@modules/logged-in';

import { SETTINGS_SCREENS, SettingsStackScreenProps } from '@typings/navigation';

const Sections: React.FC<SettingsStackScreenProps<SETTINGS_SCREENS.SECTIONS>> = ({ navigation }) => {
  useGoBack(true, navigation.goBack);
  const locale = useAppStore(state => state.locale);

  const onPressFeedback = () => navigation.navigate(SETTINGS_SCREENS.TECHNICAL_FEEDBACK);
  const onPressPaymentHistory = () => navigation.navigate(SETTINGS_SCREENS.PAYMENTS_MANAGEMENT);

  const onPressPrivacyPolicy = () => openBrowserAsync(`https://infodebit.md/${locale}/articol/24`);
  const onPressTermsAndConditions = () => openBrowserAsync(`https://infodebit.md/${locale}/articol/23`);
  const onPressRefundCancellationPolicy = () => openBrowserAsync(`https://infodebit.md/${locale}/articol/24`); // temporary

  return (
    <SettingsSectionsModule
      onPressFeedback={onPressFeedback}
      onPressPrivacyPolicy={onPressPrivacyPolicy}
      onPressPaymentHistory={onPressPaymentHistory}
      onPressTermsAndConditions={onPressTermsAndConditions}
      onPressRefundCancellationPolicy={onPressRefundCancellationPolicy}
    />
  );
};

export { Sections };
