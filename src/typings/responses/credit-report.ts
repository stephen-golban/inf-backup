export interface ICreditReportSummaryResponse {
  reportId: null;
  message?: string;
  requestorId: number;
  requestDateTime: Date;
  responseDateTime: Date;
  requestorOrgName: string;
  creditReport: CreditReport;
}

interface CreditReport {
  phones: any[];
  emails: any[];
  addresses: any[];
  legalEntity: null;
  subjectType: string;
  identityNumber: string;
  individual: Individual;
  subjectImportDate: Date;
  subjectUpdateDate: Date;
  commitments: Commitments;
  creditApplications: any[];
  primaryIndicators: PrimaryIndicators;
}

interface Commitments {
  activeNegativeCommitments: any[];
  pasiveNegativeCommitments: any[];
  activePositiveCommitments: IvePositiveCommitment[];
  pasivePositiveCommitments: IvePositiveCommitment[];
}

export interface IvePositiveCommitment {
  balance: number;
  roleType: string;
  sourceType: string;
  sourceIdno: string;
  contractNr: string;
  currentStage: number;
  sourceShortName: string;
}

interface Individual {
  deceased: null;
  gender: string;
  birthDate: Date;
  lastName: string;
  language: string;
  profession: null;
  firstName: string;
  education: string;
  childrens: number;
  fathersName: null;
  identityCard: null;
  maritalStatus: string;
  identityCardTerm: null;
  employmentStatus: string;
}

export interface PrimaryIndicators {
  totalBalance: number;
  totalDebtService: number;
  monthMaxAmount24: number;
  openedCommitments24: number;
  closedCommitments24: number;
  activeCommitmentsNr: number;
  outstandingCommitments: number;
}
