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

export interface CreateCreditReportApiResponse {
  requestDateTime: string;
  responseDateTime: string;
  reportId: any;
  creditReport: CreditReport;
  requestorId: number;
  requestorOrgName: string;
}

interface CreditReport {
  subjectType: string;
  subjectImportDate: string;
  subjectUpdateDate: string;
  identityNumber: string;
  individual: Individual;
  legalEntity: any;
  addresses: Address[];
  phones: any[];
  emails: string[];
  primaryIndicators: PrimaryIndicators;
  creditApplications: any[];
  commitments: Commitments;
}

interface Individual {
  firstName: string;
  lastName: string;
  fathersName: string;
  birthDate: string;
  identityCard: string;
  identityCardTerm: string;
  language: string;
  gender: string;
  maritalStatus: string;
  childrens: number;
  employmentStatus: string;
  profession: number;
  education: string;
  deceased: any;
}

interface Address {
  addressType: string;
  country: string;
  zipCode: string;
  county: number;
  location: string;
  street: string;
  number: any;
  house: string;
  apartment: string;
}

interface PrimaryIndicators {
  openedCommitments24: number;
  closedCommitments24: number;
  activeCommitmentsNr: number;
  outstandingCommitments: number;
  monthMaxAmount24: number;
  totalBalance: number;
  totalNetBalance: number;
  totalDebtService: number;
}

interface Commitments {
  activePositiveCommitments: ActivePositiveCommitment[];
  activeNegativeCommitments: ActiveNegativeCommitment[];
  pasivePositiveCommitments: PasivePositiveCommitment[];
  pasiveNegativeCommitments: PasiveNegativeCommitment[];
}

interface ActivePositiveCommitment {
  roleType: string;
  sourceType: string;
  sourceIdno: string;
  sourceShortName: string;
  importDate: string;
  updateDate: string;
  contractNr: string;
  openDate: string;
  currentStage: number;
  balance: number;
}

interface ActiveNegativeCommitment {
  roleType: string;
  sourceType: string;
  sourceIdno: string;
  sourceShortName: string;
  importDate: string;
  updateDate: string;
  contractNr: string;
  openDate: string;
  currentStage: number;
  balance: number;
}

interface PasivePositiveCommitment {
  roleType: string;
  sourceType: string;
  sourceIdno: string;
  sourceShortName: string;
  importDate: string;
  updateDate: string;
  contractNr: string;
  openDate: string;
  currentStage: number;
  balance: number;
}

interface PasiveNegativeCommitment {
  roleType: string;
  sourceType: string;
  sourceIdno: string;
  sourceShortName: string;
  importDate: string;
  updateDate: string;
  contractNr: string;
  openDate: string;
  currentStage: number;
  balance: number;
}
