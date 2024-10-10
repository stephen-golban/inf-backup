import React from 'react';

import { isEmpty } from 'lodash';
import { getFormattedCheckDate } from './util';

import { CheckItem, Header } from './parts';
import { OutlinedButton, Screen, Text, View } from '@components/common';

import type { OwnDataCheckApiResponse } from '@typings/responses';
import { HistoryCard } from '@components/ui';
import { useAppDataCheckStore } from '@store/data-check';

interface IWhoCheckedCreditModule {
  onRefresh?(): void;
  updateReport?(): void;
  reportLoading: boolean;
  updateLoading: boolean;
  data: OwnDataCheckApiResponse | null;
}

const WhoCheckedCreditModule: React.FC<IWhoCheckedCreditModule> = ({ data, onRefresh, updateReport, reportLoading, updateLoading }) => {
  const { inquiry, reportEvents } = useAppDataCheckStore();
  return (
    <Screen loading={reportLoading} pt="zero" scroll unsafe onRefresh={onRefresh}>
      <View bg="lightBlue" br="xl" p="lg">
        <Header days={data?.checksPeriod || 0} count={data?.checksNumber || 0} companies={data?.requestorsNumber || 0} />
      </View>
      <OutlinedButton t18n="ui:update_data" onPress={updateReport} loading={updateLoading} mt="md" />
      <View rg="sm" mt="lg">
        {!data || isEmpty(data) ? (
          <View px="lg">
            <Text textAlign="center" t18n="logged_in:home:own_data_check:who_checked:no_checks_message" />
          </View>
        ) : (
          data.checksData.map((item, idx) => {
            const checkDate = getFormattedCheckDate(item.checkDateTime);

            return <CheckItem key={checkDate + item.checkId + idx} orgName={item.orgName} checkDateTime={item.checkDateTime} />;
          })
        )}
      </View>
      <View my="sm">
        <HistoryCard t18nTitle="logged_in:home:info:last_interogation" date={inquiry?.inquiryDateTime} />
        <HistoryCard t18nTitle="logged_in:home:info:last_history_update" date={reportEvents?.lastEventDateTime} />
      </View>
    </Screen>
  );
};

export { WhoCheckedCreditModule };
