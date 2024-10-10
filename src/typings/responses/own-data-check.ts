export interface OwnDataCheckApiResponse {
  checksData: ChecksDatum[];
  checksNumber: number;
  checksPeriod: number;
  reportDateTime: Date;
  reportId: number;
  requestDateTime: Date;
  requestorsNumber: number;
  subjectData: SubjectData;
}

export interface ChecksDatum {
  checkDateTime: Date;
  checkId: number;
  orgId: string;
  orgName: string;
  serviceName: string;
}

export interface SubjectData {
  entityName: string;
  firstName: string;
  identityNumber: string;
  lastName: string;
}

export interface CreditReportQualityApiResponse {
  birthDate: Date;
  creditReportQualityDetails: CreditReportQualityDetails;
  creditReportQualityType: string;
  firstName: string;
  identityNumber: string;
  lastName: string;
  otherActiveNegativeCommitments: boolean;
  otherActiveNegativeCommitmentsDetails: Details;
  partnersDebts: number;
  reportId: number;
  requestDateTime: Date;
  responseDateTime: Date;
  servicesAvailability: boolean;
  servicesAvailabilityDetails: Details;
}

export interface CreditReportQualityDetails {
  creditBureau: null;
  datorCo: null;
  infodebit: string;
  viaScope: null;
}

export interface Details {
  creditBureau: null;
  datorCo: null;
  infodebit: boolean;
  viaScope: null;
}

export interface CreditReportEventsApiResponse {
  creditReportEvents: CreditReportEvent[];
  eventsPeriod: number;
  lastEventDateTime: string;
  reportDateTime: string;
  reportId: number;
  requestDateTime: string;
  subjectData: SubjectData;
}

export interface CreditReportEvent {
  contractNumber: string;
  eventDateTime: string;
  eventId: number;
  eventName: string;
  generatedByOrgId: string;
  generatedByOrgName: string;
  openDate: string;
}

export interface SubjectData {
  entityName: string;
  firstName: string;
  identityNumber: string;
  lastName: string;
}
