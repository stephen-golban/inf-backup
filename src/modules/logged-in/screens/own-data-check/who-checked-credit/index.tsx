import React from 'react';

import { isEmpty } from 'lodash';

import { CheckItem, Header } from './parts';
import { Screen, Text, View } from '@components/common';

import type { OwnDataCheckApiResponse } from '@typings/responses';

interface IWhoCheckedCreditModule {
  loading?: boolean;
  onRefresh?(): void;
  data: OwnDataCheckApiResponse | undefined;
}

const WhoCheckedCreditModule: React.FC<IWhoCheckedCreditModule> = ({ data, onRefresh, loading }) => {
  return (
    <Screen loading={loading} pt="zero" scroll unsafe onRefresh={onRefresh}>
      <View bg="lightBlue" br="xl" p="lg">
        <Header days={data?.checksPeriod || 0} count={data?.checksNumber || 0} companies={data?.requestorsNumber || 0} />
      </View>
      <View rg="sm" mt="lg">
        {!data || isEmpty(data) ? (
          <View px="lg">
            <Text textAlign="center" t18n="logged_in:home:own_data_check:who_checked:no_checks_message" />
          </View>
        ) : (
          data.checksData.map((item, idx) => <CheckItem orgName={item.orgName} checkId={item.checkId} checkDateTime={item.checkDateTime} />)
        )}
      </View>
    </Screen>
  );
};

export { WhoCheckedCreditModule };
