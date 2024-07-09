export interface ICreditScoreResponse {
  message?: string;
  reportId: number;
  scoreValue: number;
  blackList: boolean;
  requestDateTime: Date;
  responseDateTime: Date;
  identityNumber: string;
}
