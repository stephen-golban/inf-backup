export type AllPaymentsApiResponse = {
  count: number;
  totalAmount: number;
  paymentDetailsResponseList: PaymentDetail[];
  pageDetails: { number: number; size: number; totalElements: number; totalPages: number };
};

export type PaymentDetail = {
  amount: number;
  id: number;
  payId: string;
  paymentDateTime: string;
  paymentServiceName: string;
  purchasedServiceName: string;
  status: string;
  transactionId: string;
  userIdentityNumber: string;
};

export type RegisterCardApiResponse = {
  result: {
    payId: string;
    payUrl: string;
  };
  ok: boolean;
};
