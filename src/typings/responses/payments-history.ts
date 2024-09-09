export type AllPaymentsApiResponse = {
  count: number;
  pageDetails: PageDetails;
  payments: PaymentDetail[];
  totalAmount: number;
};
interface PageDetails {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type PaymentDetail = {
  amount: number;
  id: number;
  payId: string;
  paymentDateTime: string;
  paymentServiceName: string;
  personData: string[];
  purchasedServiceName: string;
  reimbursable: boolean;
  status: string;
  transactionId: string;
};

export type RegisterCardApiResponse = {
  result: {
    payId: string;
    payUrl: string;
  };
  ok: boolean;
};

export type GetAllCardsApiResponse = {
  id: number;
  billerId: string;
  cardNr: string;
  createdAt: string;
  main: boolean;
  cardType: string;
}[];
