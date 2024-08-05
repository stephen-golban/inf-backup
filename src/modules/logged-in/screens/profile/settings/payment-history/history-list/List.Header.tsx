import React from 'react';

import useHistoryList from './hooks';
import { useTranslation } from '@library/hooks';

import { Avatar, Icon, Text, View } from '@components/common';
import { format } from 'date-fns';

const ListHeader = () => {
  const { t } = useTranslation();
  const { handlePaymentExecution, loading } = useHistoryList();

  const due_date = format(new Date(), 'MM.dd.yyyy');

  return (
    <>
      <View row between align="center" cg="md" mt="lg">
        <View fill>
          <Text variant="16-semi" t18n="profile:settings:payment_history_screen:pay_now" flex />
          <Text variant="14-reg" text={t('profile:settings:payment_history_screen:due_date', { date: due_date })} flex mt="xs" />
        </View>
        <Avatar.Base bg="softGray" br="huge" center onPress={handlePaymentExecution}>
          <Icon icon="ChevronRight" size={16} loading={loading} />
        </Avatar.Base>
      </View>

      <Text variant="16-semi" t18n="profile:settings:payment_history_screen:payment_history" mt="xl" />
    </>
  );
};

export default ListHeader;
