import React from 'react';

import { useTheme } from '@theme/index';

import { StyleSheet, Switch } from 'react-native';
import { BaseButton, Icon, Screen, Text, View } from '@components/common';

interface ISettingsSectionsModule {
  onPressPaymentHistory(): void;
}

const SettingsSectionsModule: React.FC<ISettingsSectionsModule> = props => {
  const { onPressPaymentHistory } = props;
  const { spacing } = useTheme();

  return (
    <Screen scroll unsafe style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.md }}>
      <View py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80">
        <Text variant="18-semi" color="blue" t18n="profile:settings:my_infodebit" />
      </View>

      <BaseButton row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80" onPress={onPressPaymentHistory}>
        <Text variant="16-reg" t18n="profile:settings:payment_history" />
        <Icon icon="ChevronRight" size={16} />
      </BaseButton>

      <View row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80">
        <Text variant="16-reg" t18n="profile:settings:newsletter" />
        <Switch />
      </View>

      <View row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80">
        <Text variant="16-reg" t18n="profile:settings:sms" />
        <Switch />
      </View>

      <View row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80">
        <Text variant="16-reg" t18n="profile:settings:notification_permissions" />
        <Switch />
      </View>

      <BaseButton row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80">
        <Text variant="16-reg" t18n="profile:settings:technical_feedback" />
        <Icon icon="ChevronRight" size={16} />
      </BaseButton>

      <BaseButton row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80">
        <Text variant="18-semi" color="blue" t18n="profile:settings:others" />
      </BaseButton>

      <BaseButton row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80">
        <Text variant="16-reg" t18n="profile:settings:privacy_policy" />
        <Icon icon="ChevronRight" size={16} />
      </BaseButton>

      <BaseButton row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80">
        <Text variant="16-reg" t18n="profile:settings:terms_conditions" />
        <Icon icon="ChevronRight" size={16} />
      </BaseButton>

      <BaseButton row between align="center" py={20} bbw={StyleSheet.hairlineWidth} bbc="gray_80">
        <Text variant="16-reg" t18n="profile:settings:refund_cancellation_policy" flex />
        <Icon icon="ChevronRight" size={16} />
      </BaseButton>

      <Text textAlign="center" variant="14-reg" mt="lg" t18n="profile:settings:app_version" />
      <Text textAlign="center" variant="14-reg" mt="lg" t18n="profile:settings:made_with_love" />
    </Screen>
  );
};

export { SettingsSectionsModule };
