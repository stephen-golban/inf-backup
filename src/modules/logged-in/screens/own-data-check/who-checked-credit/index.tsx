import React from 'react';

import { isEmpty } from 'lodash';
import { getFormattedCheckDate } from './util';
import { useAppDataCheckStore } from '@store/data-check';

import { CheckItem, Header } from './parts';
import { HistoryCard } from '@components/ui';
import { Screen, Text, View } from '@components/common';

import type { OwnDataCheckApiResponse } from '@typings/responses';

interface IWhoCheckedCreditModule {
  onRefresh?(): void;
  reportLoading: boolean;
  data: OwnDataCheckApiResponse | null;
}

const WhoCheckedCreditModule: React.FC<IWhoCheckedCreditModule> = ({ data, onRefresh, reportLoading }) => {
  const { inquiry, reportEvents } = useAppDataCheckStore();
  return (
    <Screen loading={reportLoading} pt="zero" scroll unsafe onRefresh={onRefresh}>
      <View bg="lightBlue" br="xl" p="lg">
        <Header days={data?.checksPeriod || 0} count={data?.checksNumber || 0} companies={data?.requestorsNumber || 0} />
      </View>
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
