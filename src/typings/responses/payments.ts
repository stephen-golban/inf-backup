export type ExecutePaymentBody = {
  paymentServiceName: string;
  billerId: string;
  paymentType: string;
  purchasedServiceName: string;
  amount: number;
  currency: string;
  clientIp: string;
};

export type ExecutePaymentApiResponse = {
  result: {
    payId: string;
    payUrl: string;
    orderId: string;
  };
  ok: boolean;
};

export type ExecutePaymentBodyArgs = Partial<Pick<ExecutePaymentBody, 'amount' | 'currency'>> &
  Pick<ExecutePaymentBody, 'billerId' | 'purchasedServiceName' | 'paymentType'>;
