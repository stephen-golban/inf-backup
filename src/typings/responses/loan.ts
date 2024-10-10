export type LoanApiResponse =
  | {
      timestamp: string;
      message: string;
      status: number;
      expirationDate: string;
      otherSource: boolean;
      lastLeadId: number;
      lastLeadDate: string;
    }
  | number;
