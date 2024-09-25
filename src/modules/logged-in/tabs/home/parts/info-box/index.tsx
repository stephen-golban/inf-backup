import React from 'react';

import { chain } from 'lodash';
import { useAppDataCheckStore } from '@store/data-check';

import RowBox from './Row.Box';
import { format, parseISO } from 'date-fns';
import { Icon, Text, View } from '@components/common';

interface IInfoBox {
  fetchReport(): void;
  onPressNewCredit(): void;
  onPressCreditReport(): void;
  onPressWhoCheckedCredit(): void;
}

function formatDate(subjectDate: string | Record<string, any>) {
  if (typeof subjectDate === 'string') {
    const parsedDate = parseISO(subjectDate);
    return format(parsedDate, 'dd/MM/yyyy');
  } else if (subjectDate && typeof subjectDate === 'object') {
    const date = new Date(subjectDate.year, subjectDate.monthValue - 1, subjectDate.dayOfMonth);
    return format(date, 'dd/MM/yyyy');
  }

  return '';
}

const InfoBox: React.FC<IInfoBox> = props => {
  const report = useAppDataCheckStore(state => state.creditReportSummary);
  const { fetchReport, onPressCreditReport, onPressNewCredit, onPressWhoCheckedCredit } = props;

  const subjectDate = report?.creditReport.subjectUpdateDate!;
  const maxUpdateDate = chain(report?.creditReport.commitments).values().flatten().filter('updateDate').map('updateDate').max().value();

  return (
    <View fill py="lg" px="md" br="xl" bblr={0} bbrr={0}>
      <View>
        <Text variant="16-bold" t18n="logged_in:home:info:title" my="sm" />

        <View rg="sm" mt="md">
          <RowBox icon="FileIcon" title="logged_in:home:info:credit_report" onPress={onPressCreditReport} />
          <RowBox icon="PersonSearchIcon" title="logged_in:home:info:who_checked_credit" onPress={onPressWhoCheckedCredit} />
          <RowBox icon="FlakyIcon" title="logged_in:home:info:new_credit" onPress={onPressNewCredit} />
        </View>
      </View>
      <View center mb="lg">
        <Text color="blue" variant="16-bold" textAlign="center" t18n="logged_in:home:info:transform_your_history_credit" my="lg" />
        <Icon icon="CreditImage" />
        <Text textAlign="justify" t18n="logged_in:home:info:responsible_monitoring" variant="14-reg" lineHeight={30} />
      </View>
      <View bg="lightBlue" row between p="md" shadow="card" br={10} center>
        <View row center g="sm" maxw={'80%'}>
          <Text variant="12-reg" g="md" t18n="logged_in:home:info:last_interogation" />
        </View>
          {subjectDate ? (
              <Text>{formatDate(subjectDate)}</Text>
          ) : (
              <Text onPress={fetchReport} t18n="logged_in:home:info:update" variant="14-semi" color="blue" />
          )}
      </View>
      <View my="sm" />
      <View bg="lightBlue" row between p="md" shadow="card" br={10} center>
        <View row center g="sm" maxw={'80%'}>
          <Text variant="12-reg" g="md" t18n="logged_in:home:info:last_history_update" />
        </View>
        {maxUpdateDate ? (
            <Text>{formatDate(maxUpdateDate)}</Text>
        ) : (
          <Text onPress={fetchReport} t18n="logged_in:home:info:update" variant="12-semi" color="blue" />
        )}
      </View>
    </View>
  );
};

export { InfoBox };
