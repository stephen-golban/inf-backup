import React from 'react';

import { isEmpty } from 'lodash';
import { useAppStore } from '@store/app';
import { useAppDataCheckStore } from '@store/data-check';
import { useCreditReportSummaryService } from '@services/credit-report-summary';

import { loadString, saveString } from '@library/storage';
import { ScoringDetailsOffers } from '../scoring-details/offers';

import getReportSummaryOptions from './utils';
import { Screen, Text, View } from '@components/common';
import { CommitmentCount, CommitmentItem, DebtModal, EmptyState, GridItems, Header } from './parts';

import { MMKV_KEY } from '@library/constants';

import type { ICommitment, ICreditReportSummaryModule } from './typings';
import type { StageNomenclatureResponse } from '@typings/responses/nomenclatures';
import { I18nKey } from '@translations/locales';

const CreditReportSummaryModule: React.FC<ICreditReportSummaryModule> = props => {
  const { feedbackLoading, onSubmit, subscription, onPayReportLoading = false, onPressUpdate, onPayReport, navigation, loadReport, isLoadingIap } = props;
  const { nomenclature, locale } = useAppStore();

  const reportId = useAppDataCheckStore(state => state.inquiry?.basicServices.creditReportSummaryId);

  const { inquiry, reportEvents } = useAppDataCheckStore();

  const [isVisible, setIsVisible] = React.useState(false);

  const { buttonText, onPressFirstButton, costText, disabled, secondaryText, onPressSecondButton, lowerButtonText, discountText } =
    getReportSummaryOptions(subscription, navigation, onPressUpdate, onPayReport);

  const { fetchCreditReport, loadingReport, creditReportSummary } = useCreditReportSummaryService(false);

  const commitments = Object.entries(creditReportSummary?.creditReport?.commitments || {}).flatMap(([type, commitments]) =>
    commitments.map((commitment: ICommitment) => {
      const match = nomenclature.find((n: StageNomenclatureResponse) => n.attribute === commitment.currentStage);
      const description = match ? match[`description${locale.charAt(0).toUpperCase() + locale.slice(1)}`] || match.descriptionRo : '';
      const activityType = match ? match.activityType : '';
      const qualityType = match ? match.qualityType : '';
      const attribute = match ? match.attribute : 0;
      return { ...commitment, type, description, activityType, qualityType, attribute };
    }),
  );

  const searchSourceIdno = '1009600029036';

  const incassoCommitments = commitments.filter(
    commitment => commitment.type === 'activeNegativeCommitments' && commitment.sourceIdno === searchSourceIdno,
  );
  const reportRequestDateTime = creditReportSummary?.requestDateTime;
  const reportResponseDateTime = creditReportSummary?.responseDateTime;

  React.useEffect(() => {
    const lastShownTimestamp = loadString(MMKV_KEY.INCASSO_REMIND);
    const currentTimestamp = Date.now();

    const hasSpecificIdno = incassoCommitments.some(commitment => commitment.sourceIdno === searchSourceIdno);

    if (hasSpecificIdno) {
      if (!lastShownTimestamp || currentTimestamp - parseInt(lastShownTimestamp) > 60000) {
        setIsVisible(true);
      }
    }
  }, [incassoCommitments]);

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
            commitments.map((item: ICommitment, idx) => {
              return (
                <CommitmentItem
                  type={item?.type}
                  currency={item?.currency}
                  balance={item?.balance}
                  attribute={item?.attribute}
                  status={item?.roleType}
                  name={item?.sourceShortName}
                  description={item?.description}
                  qualityType={item?.qualityType}
                  activityType={item?.activityType}
                  key={idx + item?.contractNr + item?.sourceIdno}
                />
              );
            })
          )}
          <ScoringDetailsOffers
            disabled={disabled}
            secondaryText={secondaryText}
            costText={costText}
            discountText={discountText}
            buttonText={buttonText}
            subscription={subscription}
            isLoading={isLoadingIap||loadingReport || loadReport || onPayReportLoading}
            onNavigate={onPressFirstButton}
          />
          <Text variant="18-semi" t18n="logged_in:credit_report:summary:last_24_months" />
          <GridItems data={creditReportSummary?.creditReport.primaryIndicators} />
        </View>
      </Screen>
      <CommitmentCount
        buttonTitle={lowerButtonText as I18nKey}
        canOrderReport={!!creditReportSummary}
        refreshing={loadingReport}
        inquiryDateTime={inquiry?.inquiryDateTime}
        lastEventDateTime={reportEvents?.lastEventDateTime}
        onOrderReport={() => onPressSecondButton(reportId)}
        onRefresh={fetchCreditReport}
        activeNegativeCommitments={(creditReportSummary?.creditReport.commitments?.activeNegativeCommitments || []).length}
        activePositiveCommitments={(creditReportSummary?.creditReport.commitments?.activePositiveCommitments || []).length}
      />
      <DebtModal
        loading={feedbackLoading}
        isVisible={isVisible}
        onPressYes={async ({ phone }) => {
          const formattedCommitments = formatCommitmentsForBackend(incassoCommitments);
          await onSubmit({
            phone: phone,
            commitments: formattedCommitments,
            reportRequestDateTime,
            reportResponseDateTime,
          });
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
