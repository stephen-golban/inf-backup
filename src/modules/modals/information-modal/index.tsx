import React from 'react';

import { useTheme } from '@theme/index';

import { BottomSheet, Icon, Text, View } from '@components/common';

interface IInformationModal {
  isVisible: boolean;
  onDismiss(): void;
  onCheckedNavigate(): void;
  onOrderReportNavigate(): void;
  onFinancialHealthNavigate(): void;
}

const InformationModal: React.FC<IInformationModal> = props => {
  const { isVisible, onDismiss, onCheckedNavigate, onOrderReportNavigate, onFinancialHealthNavigate } = props;
  const { colors } = useTheme();

  return (
    <BottomSheet isVisible={isVisible} snapPoints={['15%']} backgroundStyle={{ backgroundColor: colors.lightBlue }} onDismiss={onDismiss}>
      <View row justify="space-between" px="md">
        <View center>
          <View bg="blue" w={40} h={40} br="round" center>
            <Icon icon={'PersonSearchIcon'} color="white" size={18} onPress={onCheckedNavigate} />
          </View>
          <Text my="sm" variant="12-mid" t18n="logged_in:home:own_data_check:who_checked:who_checked_me" />
        </View>

        <View center>
          <View bg="blue" w={40} h={40} br="round" center>
            <Icon icon={'FileIcon'} color="white" size={18} onPress={onOrderReportNavigate} />
          </View>
          <Text my="sm" variant="12-mid" t18n="logged_in:home:own_data_check:who_checked:order_report" />
        </View>

        <View center>
          <View bg="blue" w={40} h={40} br="round" center>
            <Icon icon={'FlakyIcon'} color="white" size={18} onPress={onFinancialHealthNavigate} />
          </View>
          <Text my="sm" variant="12-mid" t18n="logged_in:home:own_data_check:who_checked:financial_health" />
        </View>
      </View>
    </BottomSheet>
  );
};

export { InformationModal };
