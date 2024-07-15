import React from 'react';

import RowBox from './Row.Box';
import { Icon, Text, View } from '@components/common';
import { format } from 'date-fns';

interface IInfoBox {
  onPressNewCredit(): void;
  onPressCreditReport(): void;
  onPressWhoCheckedCredit(): void;
}

const InfoBox: React.FC<IInfoBox> = props => {
  const { onPressCreditReport, onPressNewCredit, onPressWhoCheckedCredit } = props;
  return (
    <View fill py="lg" bg="lightGray" br="xl" bblr={0} bbrr={0} mt="lg">
      <View px="md">
        <Text variant="18-bold" textAlign="center" t18n="logged_in:home:info:title" />

        <View rg="sm" mt="md">
          <RowBox icon="FileIcon" title="logged_in:home:info:credit_report" onPress={onPressCreditReport} />
          <RowBox icon="PersonSearchIcon" title="logged_in:home:info:who_checked_credit" onPress={onPressWhoCheckedCredit} />
          <RowBox icon="FlakyIcon" title="logged_in:home:info:new_credit" onPress={onPressNewCredit} />
        </View>
      </View>
      <View my="sm">
        <Text px="lg" variant="16-bold" textAlign="center" t18n="logged_in:home:info:credit_history_updates" my="md" />
        <Icon icon="CalendarIcon" absolute right={10} />
      </View>
      <View bg="white" row between p="md" shadow="card">
        <View row center g="sm">
          <Icon icon="CalendarIcon" />
          <Text variant="14-bold" g="md" t18n="logged_in:home:info:payment_behavior" />
        </View>
        <Text>{format(new Date(), 'dd/MM/yyyy')}</Text>
      </View>
      <View my="sm" />
      <View bg="white" row between p="md" shadow="card">
        <View row center g="sm">
          <Icon icon="CalendarIcon" />
          <Text variant="14-bold" g="md" t18n="logged_in:home:info:personal_data" />
        </View>
        <Text>{format(new Date(), 'dd/MM/yyyy')}</Text>
      </View>
    </View>
  );
};

export { InfoBox };
