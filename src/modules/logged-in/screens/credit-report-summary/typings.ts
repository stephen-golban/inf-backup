import { ICreditReportSummaryResponse, IvePositiveCommitment } from '@typings/responses';

export interface ICreditReportSummaryModule {
  loading: boolean;
  onOrderReport(): void;
  onSubmit(arg: {
    phone: string;
    commitments: ICommitment[];
    reportRequestDateTime: Date | undefined;
    reportResponseDateTime: Date | undefined;
  }): void;
  data?: ICreditReportSummaryResponse;
}

export interface ICommitment extends IvePositiveCommitment {
  type: string;
  description: string;
  qualityType: string;
  activityType: string;
}
