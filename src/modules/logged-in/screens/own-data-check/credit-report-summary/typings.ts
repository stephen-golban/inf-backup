import { ICreditReportSummaryResponse, IvePositiveCommitment } from '@typings/responses';

export interface ICreditReportSummaryModule {
  feedbackLoading: boolean;
  onOrderReport(): void;
  onSubmit(arg: {
    phone: string;
    commitments: ICommitment[];
    reportRequestDateTime: Date | string | undefined;
    reportResponseDateTime: Date | string | undefined;
  }): void;
  data: ICreditReportSummaryResponse | null;
}

export interface ICommitment extends IvePositiveCommitment {
  type: string;
  description: string;
  qualityType: string;
  activityType: string;
}
