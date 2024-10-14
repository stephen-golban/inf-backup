import React from 'react';

import { formatDate } from 'date-fns';
import { SkeletonLoader } from './parts';

import { Text, View } from '@components/common';
import { I18nKey } from '@translations/locales';

interface IHistoryCard {
  loading?: boolean;
  t18nTitle: I18nKey;
  date: Date | string | undefined;
}

const HistoryCard: React.FC<IHistoryCard> = props => {
  const { loading, t18nTitle, date } = props;

  return (
    <View my="xs">
      {loading ? (
        <SkeletonLoader />
      ) : (
        date && (
          <View bg="lightBlue" row between p="md" shadow="card" br={10} center>
            <View row center g="sm" maxw={'80%'}>
              <Text variant="10-reg" g="md" t18n={t18nTitle} />
            </View>
            <Text variant="10-mid">{formatDate(date, 'dd/MM/yyyy')}</Text>
          </View>
        )
      )}
    </View>
  );
};

export { HistoryCard };
