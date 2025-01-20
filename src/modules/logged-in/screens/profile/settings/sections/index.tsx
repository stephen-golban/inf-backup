import React from 'react';

import { useTheme } from '@theme/index';
import useSectionsModule from './hooks';

import { StyleSheet, Switch } from 'react-native';
import { BaseButton, Icon, Screen, Text, View } from '@components/common';
import { useTranslation } from '@library/hooks';

import Config from 'react-native-config';

const { APP_VERSION } = Config;

interface ISettingsSectionsModule {
  onPressFeedback(): void;
  onPressPaymentHistory(): void;
  onPressPrivacyPolicy(): void;
  onPressTermsAndConditions(): void;
  onPressRefundCancellationPolicy(): void;
}

const SettingsSectionsModule: React.FC<ISettingsSectionsModule> = props => {
  const { onPressPaymentHistory, onPressPrivacyPolicy, onPressFeedback, onPressRefundCancellationPolicy, onPressTermsAndConditions } =
    props;

  const { spacing } = useTheme();

  const { t } = useTranslation();

  const {
    loading,
    refetch,
    smsEnabled,
    handleToggleSms,
    newsletterEnabled,
    handleToggleNewsletter,
    sendPushNotifications,
    handleTogglePushNotifications,
  } = useSectionsModule();

  return (
    <Screen scroll loading={loading} unsafe style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.md }} onRefresh={refetch}>
      <View py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80">
        <Text variant="18-semi" color="blue" t18n="profile:settings:my_infodebit" />
      </View>

      <BaseButton row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80" onPress={onPressPaymentHistory}>
        <Text variant="16-reg" t18n="profile:settings:payment_management" />
        <Icon icon="ChevronRight" size={16} />
      </BaseButton>

      <View row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80">
        <Text variant="16-reg" t18n="profile:settings:newsletter" />
        <Switch onValueChange={handleToggleNewsletter} value={newsletterEnabled} />
      </View>

      <View row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80">
        <Text variant="16-reg" t18n="profile:settings:sms" />
        <Switch onValueChange={handleToggleSms} value={smsEnabled} />
      </View>

      <View row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80">
        <Text variant="16-reg" t18n="profile:settings:notification_permissions" />
        <Switch onValueChange={handleTogglePushNotifications} value={sendPushNotifications} />
      </View>

      <BaseButton row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80" onPress={onPressFeedback}>
        <Text variant="16-reg" t18n="profile:settings:technical_feedback" />
        <Icon icon="ChevronRight" size={16} />
      </BaseButton>

      <BaseButton row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80">
        <Text variant="18-semi" color="blue" t18n="profile:settings:others" />
      </BaseButton>

      <BaseButton row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80" onPress={onPressPrivacyPolicy}>
        <Text variant="16-reg" t18n="profile:settings:privacy_policy" />
        <Icon icon="ChevronRight" size={16} />
      </BaseButton>

      <BaseButton row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80" onPress={onPressTermsAndConditions}>
        <Text variant="16-reg" t18n="profile:settings:terms_conditions" />
        <Icon icon="ChevronRight" size={16} />
      </BaseButton>

      <BaseButton row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80" onPress={onPressRefundCancellationPolicy}>
        <Text variant="16-reg" t18n="profile:settings:refund_cancellation_policy" flex />
        <Icon icon="ChevronRight" size={16} />
      </BaseButton>

      <Text textAlign="center" variant="14-reg" mt="lg">
        {`${t('profile:settings:app_version')}: ${APP_VERSION}`}
      </Text>
      <Text textAlign="center" variant="14-reg" mt="lg" t18n="profile:settings:made_with_love" />
    </Screen>
  );
};

export { SettingsSectionsModule };
