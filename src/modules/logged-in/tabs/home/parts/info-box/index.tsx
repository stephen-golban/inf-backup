import React from 'react';

import RowBox from './Row.Box';
import { Text, View } from '@components/common';

interface IInfoBox {
  onPressNewCredit(): void;
  onPressCreditReport(): void;
  onPressWhoCheckedCredit(): void;
}

const InfoBox: React.FC<IInfoBox> = props => {
  const { onPressCreditReport, onPressNewCredit, onPressWhoCheckedCredit } = props;
  return (
    <View fill px="md" py="lg" bg="lightGray" br="xl" bblr={0} bbrr={0} mt="lg">
      <Text variant="18-bold" textAlign="center" t18n="logged_in:home:info:title" />

      <View rg="sm" mt="md">
        <RowBox icon="FileIcon" title="logged_in:home:info:credit_report" onPress={onPressCreditReport} />
        <RowBox icon="PersonSearchIcon" title="logged_in:home:info:who_checked_credit" onPress={onPressWhoCheckedCredit} />
        <RowBox icon="FlakyIcon" title="logged_in:home:info:new_credit" onPress={onPressNewCredit} />
      </View>
    </View>
  );
};

export { InfoBox };
