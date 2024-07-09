import React from 'react';

import { format } from 'date-fns';
import { Text, View } from '@components/common';

interface ICheckItem {
  orgName: string;
  checkId: number;
  checkDateTime: Date;
}

const CheckItem: React.FC<ICheckItem> = ({ orgName, checkDateTime, checkId }) => {
  const checkDate = format(new Date(checkDateTime), 'yyyy-MM-dd');

  return (
    <View key={checkDate + checkId} bg="lightGray" px="md" py="lg" row align="center" br={24} shadow="card">
      <Text variant="18-bold" flex fontWeight="400" text={orgName} />
      <View>
        <Text variant="12-semi" text={checkDate} />
        <Text variant="12-semi" style={{ marginTop: 4 }} text={format(new Date(checkDateTime), 'HH:mm:ssXXX')} />
      </View>
    </View>
  );
};

export { CheckItem };
