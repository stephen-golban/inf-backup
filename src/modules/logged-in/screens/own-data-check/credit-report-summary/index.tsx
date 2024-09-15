import React from 'react';
import { useAppStore } from '@store/app';
import { isEmpty } from 'lodash';
import { MMKV_KEY } from '@library/constants';
import { loadString, saveString } from '@library/storage';
import { OutlinedButton, Screen, Text, View } from '@components/common';
import { CommitmentCount, CommitmentItem, DebtModal, EmptyState, GridItems, Header } from './parts';

import { ICommitment, ICreditReportSummaryModule } from './typings';
import { StageNomenclatureResponse } from '@typings/responses/nomenclatures';

const CreditReportSummaryModule: React.FC<ICreditReportSummaryModule> = props => {
  const { data, loading, onOrderReport, onSubmit } = props;
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

  const incassoCommitments = commitments.filter(
    commitment => commitment.sourceIdno === searchSourceIdno && commitment.type === 'activeNegativeCommitments',
  );

  const reportRequestDateTime = data?.requestDateTime;
  const reportResponseDateTime = data?.responseDateTime;

  React.useEffect(() => {
    const lastShownTimestamp = loadString(MMKV_KEY.INCASSO_REMIND);
    const currentTimestamp = Date.now();

    if (sourceIdnos.includes(searchSourceIdno)) {
      if (!lastShownTimestamp || currentTimestamp - parseInt(lastShownTimestamp) > 60000) {
        setIsVisible(true);
      }
    }
  }, [sourceIdnos]);

  const isData = data || !isEmpty(commitments);

  const formatCommitmentsForBackend = (commitments: ICommitment[]) => {
    return commitments.map(({ sourceIdno, ...commitment }) => ({
      ...commitment,
      sourceIdentityNumber: sourceIdno,
    }));
  };

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
        loading={loading}
        isVisible={isVisible}
        onPressYes={async ({ phone }) => {
          const formattedCommitments = formatCommitmentsForBackend(incassoCommitments);
          await onSubmit({ phone: '+373' + phone, commitments: formattedCommitments, reportRequestDateTime, reportResponseDateTime });
          const currentTimestamp = Date.now();
          saveString(MMKV_KEY.INCASSO_REMIND, currentTimestamp.toString());
          setIsVisible(false);
        }}
        onPressNo={() => setIsVisible(false)}
      />
    </View>
  );
};

export { CreditReportSummaryModule };
