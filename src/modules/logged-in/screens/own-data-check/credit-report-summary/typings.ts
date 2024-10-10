import { OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps } from '@typings/navigation';
import { ICreditReportSummaryResponse, IvePositiveCommitment, PurchasedSubscription } from '@typings/responses';

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
  subscription: PurchasedSubscription | undefined;
  onPressUpdate(): void;
  onPayReport(): void;
  navigation: OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.CreditReportSummary>['navigation'];
}

export interface ICommitment extends IvePositiveCommitment {
  type: string;
  description: string;
  qualityType: string;
  activityType: string;
}
