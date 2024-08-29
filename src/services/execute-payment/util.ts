import { ExecutePaymentBody, ExecutePaymentBodyArgs } from '@typings/responses';

export const createPaymentBody = ({ amount = 100, currency = 'MDL', ...args }: ExecutePaymentBodyArgs): ExecutePaymentBody => {
  return {
    amount,
    currency,
    clientIp: '127.0.0.1',
    paymentServiceName: 'MAIB',
    ...args,
  };
};
