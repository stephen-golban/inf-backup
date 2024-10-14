import { Color } from '@theme/colors';
import { isAfter, parseISO } from 'date-fns';
import { PurchasedSubscription } from '@typings/responses';
import { LOGGED_IN_SCREENS, OwnDataCheckScreenProps, SUBSCRIPTIONS_SCREENS } from '@typings/navigation';
import { useTranslation } from '@library/hooks';

interface SubscriptionResult {
  message: string;
  buttonText: string;
  secondButtonType: 'filled' | 'outlined';
  lowerButtonText: string;
  discountText?: string;
  secondaryText?: string;
  costText?: string;
  firstButtonTextColor?: Color;
  secondButtonTextColor?: Color;
  firstButtonType: 'filled' | 'outlined';
  disabled: boolean;
  onPressFirstButton: () => void;
  onPressSecondButton: () => void;
}

const getReportSummaryOptions = (
  subscription: PurchasedSubscription | undefined,
  navigation: OwnDataCheckScreenProps<any>['navigation'],
  onPressUpdate: () => void,
  onPayReport: () => void,
): SubscriptionResult => {
  const { t } = useTranslation();

  if (!subscription) {
    return {
      message: '',
      buttonText: '',
      firstButtonType: 'filled',
      disabled: false,
      secondButtonType: 'filled',
      lowerButtonText: '',
      discountText: undefined,
      costText: undefined,
      onPressFirstButton: () => {},
      onPressSecondButton: () => {},
    };
  }

  const { trial, extraInquiriesRestriction, servicesAccesses, subscriptionAccounts, discountData, price } = subscription;

  const account = subscriptionAccounts?.[0];
  const termDateTime = account?.termDateTime;
  let isExpired = true;

  if (termDateTime) {
    try {
      isExpired = !isAfter(parseISO(termDateTime), new Date());
    } catch (error) {
      console.error('Invalid termDateTime format:', error);
    }
  }

  const creditScoreService = servicesAccesses?.find(s => s.service === 'CreditScore');
  const isCreditScoreIncluded = creditScoreService?.included || false;
  const creditScorePrice = creditScoreService?.prices[0].price || 0;

  let discountText = undefined;
  if (discountData?.discount) {
    discountText = t('subscriptions:annual_discount_text', { discountAmount: discountData.discountAmount });
  }
  if (trial) {
    return {
      message: t('ui:subscription:trial_message'),
      buttonText: t('profile:my_account:subscription_details:choose_subscription'),
      firstButtonTextColor: 'white',
      secondButtonTextColor: 'blue',
      firstButtonType: 'filled',
      disabled: false,
      costText: t('ui:subscription:trial_cost_text', { price }),
      secondButtonType: 'outlined',
      lowerButtonText: t('logged_in:credit_report:credit_report_summary_options:for_complete_data_choose_a_subscription'),
      discountText: discountText,
      onPressFirstButton: () => navigation.navigate(LOGGED_IN_SCREENS.SUBSCRIPTIONS, { screen: SUBSCRIPTIONS_SCREENS.INDEX }),
      onPressSecondButton: () => navigation.navigate(LOGGED_IN_SCREENS.SUBSCRIPTIONS, { screen: SUBSCRIPTIONS_SCREENS.INDEX }),
    };
  } else if (!trial && extraInquiriesRestriction && !isExpired) {
    return {
      message: t('ui:subscription:extra_inquiries_message'),
      buttonText: t('logged_in:credit_report:credit_report_summary_options:information_from_today'),
      firstButtonType: 'outlined',
      disabled: true,
      costText: t('ui:subscription:extra_inquiries_cost_text'),
      secondButtonType: 'filled',
      firstButtonTextColor: 'blue',
      secondButtonTextColor: 'white',
      lowerButtonText: t('ui:subscription:extra_inquiries_lower_button_text'),
      discountText: t('subscriptions:discount_text_other_subscription'),
      onPressFirstButton: () => {},
      onPressSecondButton: () => navigation.navigate(LOGGED_IN_SCREENS.SUBSCRIPTIONS, { screen: SUBSCRIPTIONS_SCREENS.INDEX }),
    };
  } else if (!trial && !extraInquiriesRestriction && !isExpired && !isCreditScoreIncluded) {
    return {
      message: t('ui:subscription:no_credit_score_message'),
      buttonText: t('logged_in:credit_report:credit_report_summary_options:information_from_today'),
      firstButtonType: 'filled',
      disabled: false,
      secondButtonType: 'outlined',
      firstButtonTextColor: 'white',
      secondButtonTextColor: 'blue',
      costText: t('ui:subscription:no_credit_score_cost_text', { creditScorePrice }),
      lowerButtonText: t('ui:subscription:no_credit_score_lower_button_text'),
      discountText: t('ui:subscription:no_credit_score_discount_text'),
      secondaryText: t('ui:subscription:no_credit_score_discount_text'),
      onPressFirstButton: onPayReport,
      onPressSecondButton: () => navigation.navigate(LOGGED_IN_SCREENS.SUBSCRIPTIONS, { screen: SUBSCRIPTIONS_SCREENS.INDEX }),
    };
  } else if (!trial && !extraInquiriesRestriction && !isExpired && isCreditScoreIncluded) {
    return {
      message: t('ui:subscription:credit_score_included_message'),
      buttonText: t('logged_in:credit_report:credit_report_summary_options:information_from_today'),
      firstButtonType: 'filled',
      disabled: false,
      secondButtonType: 'outlined',
      firstButtonTextColor: 'white',
      secondButtonTextColor: 'blue',
      costText: t('ui:subscription:credit_score_included_cost_text'),
      lowerButtonText: t('ui:subscription:credit_score_included_lower_button_text'),
      secondaryText: t('ui:subscription:credit_score_included_discount_text'),
      onPressFirstButton: onPressUpdate,
      onPressSecondButton: onPressUpdate,
    };
  }

  return {
    message: '',
    buttonText: '',
    firstButtonType: 'filled',
    disabled: false,
    secondButtonType: 'outlined',
    firstButtonTextColor: 'white',
    secondButtonTextColor: 'blue',
    lowerButtonText: '',
    discountText: undefined,
    costText: undefined,
    onPressFirstButton: () => {},
    onPressSecondButton: () => {},
  };
};

export default getReportSummaryOptions;
