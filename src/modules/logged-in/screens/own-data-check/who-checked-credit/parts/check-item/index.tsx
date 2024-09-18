import React from 'react';

import { getFormattedCheckDate } from '../../util';

import { Text, View } from '@components/common';

interface ICheckItem {
  orgName: string;
  checkDateTime: Date;
}

const CheckItem: React.FC<ICheckItem> = ({ orgName, checkDateTime }) => {
  const checkDate = getFormattedCheckDate(checkDateTime);
  const checkTime = getFormattedCheckDate(checkDateTime, true);

  return (
    <View bg="lightGray" px="md" py="lg" row align="center" br={24} shadow="card">
      <Text variant="18-bold" flex fontWeight="400" text={orgName} />
      <View>
        <Text variant="12-semi" text={checkDate} />
        <Text variant="12-semi" style={{ marginTop: 4 }} text={checkTime} />
      </View>
    </View>
  );
};

export { CheckItem };
