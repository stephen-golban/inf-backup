import React from 'react';

import { useTranslation } from 'react-i18next';

import { ScoringText } from './text';
import { ScoringOptions } from './options';
import getSubscriptionDetails from './utils';
import { ScoringDetailsOffers } from './offers';
import ScoringDetailsBenefits from './benefits';

import { Scoring } from '@components/ui';
import { CarouselComponent, FilledButton, Icon, OutlinedButton, Screen, Text, View } from '@components/common';

import { CreditReportEventsApiResponse, CreditReportQualityApiResponse, PurchasedSubscription } from '@typings/responses';
import { OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps } from '@typings/navigation';
import { formatDate } from 'date-fns';
import { useAppDataCheckStore } from '@store/data-check';
import { useAppStore } from '@store/app';
import { useAxios } from '@api/hooks';

interface IScoringDetailsModuleProps {
  navigation: OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.ScoringDetails>['navigation'];
  score?: number;
  loading: boolean;
  onPayReport(): void;
  onPressUpdate(): void;
  subscription: PurchasedSubscription | undefined;
  creditReportEvents: CreditReportEventsApiResponse | undefined;
}

const ScoringDetailsModule: React.FC<IScoringDetailsModuleProps> = props => {
  const { navigation, score, loading, subscription, onPressUpdate, onPayReport, creditReportEvents } = props;
  const { t } = useTranslation();
  const { creditScore } = useAppDataCheckStore();

  const {
    message,
    buttonText,
    secondButtonType,
    lowerButtonText,
    secondButtonTextColor,
    onPressFirstButton,
    onPressSecondButton,
    costText,
    disabled,
    secondaryText,
  } = getSubscriptionDetails(subscription, navigation, onPressUpdate, onPayReport);
  const Button = secondButtonType === 'filled' ? FilledButton : OutlinedButton;

  const data = [
    t('logged_in:home:financial_behavior_impact'),
    t('logged_in:home:correct_debt_management'),
    t('logged_in:home:timely_bill_payment'),
  ];

  const renderItem = (carouselData: { item: string; index: number }) => (
    <View bg="lightBlue" px="md" center py="lg" row align="center" br={16} shadow="card" mx="sm">
      <Text variant="14-reg" center>
        {carouselData.item}
      </Text>
    </View>
  );

  return (
    <Screen unsafe scroll px="zero">
      <Scoring rating={score || 0} />
      <ScoringText score={score || 0} />

      <View my="sm">
        {creditScore?.responseDateTime && (
          <View bg="lightBlue" row between p="md" shadow="card" br={10} center>
            <View row center g="sm" maxw={'80%'}>
              <Text variant="12-reg" g="md" t18n="logged_in:credit_report:last_credit_score_interogation" />
            </View>
            <Text variant="12-mid">{formatDate(creditScore?.responseDateTime, 'dd/MM/yyyy')}</Text>
          </View>
        )}

        {creditReportEvents?.lastEventDateTime && (
          <View mt="sm" bg="lightBlue" row between p="md" shadow="card" br={10} center>
            <View row center g="sm" maxw={'80%'}>
              <Text variant="12-reg" g="md" t18n="logged_in:credit_report:last_credit_history_update" />
            </View>
            <Text variant="12-mid">{formatDate(creditReportEvents?.lastEventDateTime, 'dd/MM/yyyy')}</Text>
          </View>
        )}
      </View>

      <ScoringOptions
        image={require('@assets/images/scoring/grown.png')}
        title="logged_in:credit_report:scoring:scoring_negative"
        color="crimsonRed"
        minValue={0}
        maxValue={550}
        value={20}
      />
      <ScoringOptions
        image={require('@assets/images/scoring/fair.png')}
        title="logged_in:credit_report:scoring:scoring_neutral"
        color="goldenYellow"
        minValue={551}
        maxValue={600}
        value={60}
      />
      <ScoringOptions
        image={require('@assets/images/scoring/lucky.png')}
        title="logged_in:credit_report:scoring:scoring_positive"
        color="limeGreen"
        minValue={601}
        maxValue={650}
        value={80}
      />
      <ScoringOptions
        image={require('@assets/images/scoring/best.png')}
        title="logged_in:credit_report:scoring:scoring_excelent"
        color="forestGreen"
        minValue={651}
        maxValue={1000}
        value={100}
        hasDivider={false}
      />
      <Icon icon="CreditReportIcon" center p="md" />
      <CarouselComponent data={data} renderItem={renderItem} />

      <Text color="blue" variant="16-bold" center lineHeight={25}>
        {message}
      </Text>

      <ScoringDetailsOffers
        disabled={disabled}
        secondaryText={secondaryText}
        costText={costText}
        buttonText={buttonText}
        subscription={subscription}
        isLoading={loading}
        onNavigate={onPressFirstButton}
      />

      <ScoringDetailsBenefits />

      <Button mt="lg" cg="sm" onPress={onPressSecondButton} br="md">
        <Text color={secondButtonTextColor}>{lowerButtonText}</Text>
      </Button>
    </Screen>
  );
};

export { ScoringDetailsModule };
