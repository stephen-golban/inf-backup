import React from 'react';

import { format } from 'date-fns';
import { useLazyAxios } from '@api/hooks';
import { useTranslation, useTryCatch } from '@library/hooks';

import { Avatar, Icon, Text, View, OutlinedButton } from '@components/common';

import type { PaymentDetail } from '@typings/responses';

const ListItem: React.FC<PaymentDetail> = ({ purchasedServiceName, id, paymentDateTime, amount, reimbursable }) => {
  const { t } = useTranslation();
  const [call, { loading }] = useLazyAxios(`/payment-purchases/${id}/refund`, { method: 'post' });

  const onReimburse = useTryCatch(async () => await call(undefined, res => console.log(res), { params: { refundAmount: amount } }));

  return (
    <>
      <View py={20} row between align="center" mt="sm">
        <View row fill align="center">
          <Avatar.Base bg="skyBlue" br="huge" center size={40}>
            <Icon icon="DoubleCheck" color="white" size={18} />
          </Avatar.Base>
          <Text variant="12-semi" text={purchasedServiceName} ml="sm" flex />
        </View>
        <View>
          <Text variant="12-reg" text={format(paymentDateTime, 'MM.dd.yyyy')} />
          <Text variant="12-reg" text={t('profile:settings:payment_history_screen:amount', { amount })} mt="xs" />
        </View>
      </View>
      {reimbursable && (
        <OutlinedButton t18n={'profile:settings:payment_history_screen:reimbursable'} loading={loading} onPress={onReimburse} />
      )}
    </>
  );
};

export default ListItem;
