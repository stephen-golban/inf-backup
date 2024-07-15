import React from 'react';
import { useAppStore } from '@store/app';
import { isEmpty } from 'lodash';
import { OutlinedButton, Screen, Text, View } from '@components/common';
import { CommitmentCount, CommitmentItem, DebtModal, DebtModalPhone, EmptyState, GridItems, Header } from './parts';
import { StageNomenclatureResponse } from '@typings/responses/nomenclatures';
import { ICreditReportSummaryResponse, IvePositiveCommitment } from '@typings/responses';

interface ICreditReportSummaryModule {
  onOrderReport(): void;
  onSubmit(arg: DebtModalPhone): void;
  data?: ICreditReportSummaryResponse;
}

interface ICommitment extends IvePositiveCommitment {
  type: string;
  description: string;
  activityType: string;
  qualityType: string;
}

const CreditReportSummaryModule: React.FC<ICreditReportSummaryModule> = props => {
  const { data, onOrderReport, onSubmit } = props;
  const { nomenclature, locale } = useAppStore();

  const [isVisible, setIsVisible] = React.useState(false);

  const commitments = Object.entries(data?.creditReport?.commitments || {}).flatMap(([type, commitments]) =>
    commitments.map((commitment: ICommitment) => {
      const match = nomenclature.find((n: StageNomenclatureResponse) => n.attribute === commitment.currentStage);
      const description = match ? match[`description${locale.charAt(0).toUpperCase() + locale.slice(1)}`] || match.descriptionRo : '';
      const activityType = match ? match.activityType : '';
      const qualityType = match ? match.qualityType : '';
      return { ...commitment, type, description, activityType, qualityType };
    }),
  );

  const sourceIdnos = commitments.map(commitment => commitment.sourceIdno);
  const searchSourceIdno = '1009600029036';

  React.useEffect(() => {
    if (sourceIdnos.includes(searchSourceIdno)) {
      setIsVisible(true);
    }
  }, [sourceIdnos]);

  const isData = data || !isEmpty(commitments);

  return (
    <View fill bg="white">
      <Screen pt="zero" scroll unsafe>
        <Header totalBalance={data?.creditReport?.primaryIndicators?.totalBalance || 0} />
        <View rg="sm" mt="lg">
          {!isData ? (
            <EmptyState />
          ) : (
            commitments.map((item: ICommitment, idx) => (
              <CommitmentItem
                type={item?.type}
                balance={item?.balance}
                status={item?.roleType}
                name={item?.sourceShortName}
                description={item?.description}
                qualityType={item?.qualityType}
                activityType={item?.activityType}
                key={idx + item?.contractNr + item?.sourceIdno}
              />
            ))
          )}
          <OutlinedButton
            my="sm"
            textProps={{ variant: '12-reg' }}
            t18n={
              isData ? 'logged_in:credit_report_summary:order_the_report' : 'logged_in:credit_report_summary:follow_us_for_more_information'
            }
          />
          <Text variant="18-semi" t18n="logged_in:credit_report_summary:last_24_months" />
          <GridItems data={data?.creditReport.primaryIndicators} />
        </View>
      </Screen>
      <CommitmentCount
        onOrderReport={onOrderReport}
        activeNegativeCommitments={data?.creditReport.commitments.activeNegativeCommitments.length}
        activePositiveCommitments={data?.creditReport.commitments.activePositiveCommitments.length}
      />
      <DebtModal
        isVisible={isVisible}
        onPressYes={data => {
          onSubmit(data);
          setIsVisible(false);
        }}
        onPressNo={() => setIsVisible(false)}
      />
    </View>
  );
};

export { CreditReportSummaryModule };
