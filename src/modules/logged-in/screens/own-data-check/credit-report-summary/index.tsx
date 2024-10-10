import React from 'react';

import { isEmpty } from 'lodash';
import { useAppStore } from '@store/app';
import { useAppDataCheckStore } from '@store/data-check';
import { useCreditReportSummaryService } from '@services/credit-report-summary';

import { formatDate } from 'date-fns';
import { HistoryCard } from '@components/ui';
import { loadString, saveString } from '@library/storage';
import { ScoringDetailsOffers } from '../scoring-details/offers';

import getReportSummaryOptions from './utils';
import { Screen, Text, View } from '@components/common';
import { CommitmentCount, CommitmentItem, DebtModal, EmptyState, GridItems, Header } from './parts';

import { MMKV_KEY } from '@library/constants';

import type { ICommitment, ICreditReportSummaryModule } from './typings';
import type { StageNomenclatureResponse } from '@typings/responses/nomenclatures';

const CreditReportSummaryModule: React.FC<ICreditReportSummaryModule> = props => {
  const { feedbackLoading, onOrderReport, onSubmit, subscription, onPressUpdate, onPayReport, navigation } = props;
  const { nomenclature, locale } = useAppStore();

  const { inquiry, reportEvents } = useAppDataCheckStore();

  const [isVisible, setIsVisible] = React.useState(false);

  const { buttonText, onPressFirstButton, costText, disabled, secondaryText } = getReportSummaryOptions(
    subscription,
    navigation,
    onPressUpdate,
    onPayReport,
  );

  const { fetchCreditReport, loading, creditReportSummary } = useCreditReportSummaryService(false);

  const commitments = Object.entries(creditReportSummary?.creditReport?.commitments || {}).flatMap(([type, commitments]) =>
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

  const reportRequestDateTime = formatDate(String(creditReportSummary?.requestDateTime), 'dd/MM/yyyy');
  const reportResponseDateTime = formatDate(String(creditReportSummary?.responseDateTime), 'dd/MM/yyyy');

  React.useEffect(() => {
    const lastShownTimestamp = loadString(MMKV_KEY.INCASSO_REMIND);
    const currentTimestamp = Date.now();

    if (sourceIdnos.includes(searchSourceIdno)) {
      if (!lastShownTimestamp || currentTimestamp - parseInt(lastShownTimestamp) > 60000) {
        setIsVisible(true);
      }
    }
  }, [sourceIdnos]);

  const isData = creditReportSummary || !isEmpty(commitments);

  const formatCommitmentsForBackend = (commitments: ICommitment[]) => {
    return commitments.map(({ sourceIdno, ...commitment }) => ({
      ...commitment,
      sourceIdentityNumber: sourceIdno,
    }));
  };

  return (
    <View fill bg="white">
      <Screen pt="zero" scroll unsafe>
        <Header totalBalance={creditReportSummary?.creditReport?.primaryIndicators?.totalBalance || 0} />
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
          <ScoringDetailsOffers
            disabled={disabled}
            secondaryText={secondaryText}
            costText={costText}
            buttonText={buttonText}
            subscription={subscription}
            isLoading={loading}
            onNavigate={onPressFirstButton}
          />
          <Text variant="18-semi" t18n="logged_in:credit_report:summary:last_24_months" />
          <GridItems data={creditReportSummary?.creditReport.primaryIndicators} />
          <HistoryCard t18nTitle="logged_in:home:info:last_interogation" date={inquiry?.inquiryDateTime} />
          <HistoryCard t18nTitle="logged_in:credit_report:last_credit_history_update" date={reportEvents?.lastEventDateTime} />
        </View>
      </Screen>
      <CommitmentCount
        canOrderReport={!!creditReportSummary}
        refreshing={loading}
        onOrderReport={onOrderReport}
        onRefresh={fetchCreditReport}
        activeNegativeCommitments={(creditReportSummary?.creditReport.commitments?.activeNegativeCommitments || []).length}
        activePositiveCommitments={(creditReportSummary?.creditReport.commitments?.activePositiveCommitments || []).length}
      />
      <DebtModal
        loading={feedbackLoading}
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
