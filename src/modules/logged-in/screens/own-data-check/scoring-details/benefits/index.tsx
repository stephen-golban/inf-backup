import React from 'react';
import { Icon, Text, View } from '@components/common';

const ScoringDetailsBenefits = () => {
  return (
    <View my="lg" justify="center">
      <Text color="blue" variant="16-bold" center t18n="logged_in:credit_report_summary:scoring_details_benefits:title" />
      <View row g="sm" align="center" mt="lg" maxw="90%">
        <Icon icon="CheckCircleIcon" color="forestGreen" />
        <Text variant="14-reg" lineHeight={22} t18n="logged_in:credit_report_summary:scoring_details_benefits:benefit_1" />
      </View>
      <View row g="sm" align="center" my="sm" maxw="90%">
        <Icon icon="CheckCircleIcon" color="forestGreen" />
        <Text variant="14-reg" lineHeight={22} t18n="logged_in:credit_report_summary:scoring_details_benefits:benefit_2" />
      </View>
      <View row g="sm" align="center" my="sm" maxw="90%">
        <Icon icon="CheckCircleIcon" color="forestGreen" />
        <Text variant="14-reg" lineHeight={22} t18n="logged_in:credit_report_summary:scoring_details_benefits:benefit_3" />
      </View>
      <View row g="sm" align="center" my="sm" maxw="90%">
        <Icon icon="CheckCircleIcon" color="forestGreen" />
        <Text variant="14-reg" lineHeight={22} t18n="logged_in:credit_report_summary:scoring_details_benefits:benefit_4" />
      </View>
    </View>
  );
};

export default ScoringDetailsBenefits;
