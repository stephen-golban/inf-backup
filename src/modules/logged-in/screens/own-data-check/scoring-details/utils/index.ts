import { Color } from '@theme/colors';
import { isAfter, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { PurchasedSubscription } from '@typings/responses';
import { LOGGED_IN_SCREENS, OwnDataCheckScreenProps, SUBSCRIPTIONS_SCREENS } from '@typings/navigation';

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

const getSubscriptionDetails = (
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
  if (discountData?.discount || discountData?.annualDiscount) {
    discountText = t('subscriptions:discount_text_other_subscription', {
      discountAmount: discountData.discountAmount + (discountData.annualDiscount && !discountData.discount ? '%' : ' MDL'),
    });
  }
  if ((trial && !isExpired) || isExpired) {
    return {
      message: t('subscription.trial_message'),
      buttonText: t('subscription.trial_button_text'),
      firstButtonTextColor: 'white',
      secondButtonTextColor: 'blue',
      firstButtonType: 'filled',
      disabled: false,
      costText: t('subscription.trial_cost_text', { price }),
      secondButtonType: 'outlined',
      lowerButtonText: t('subscription.trial_lower_button_text'),
      discountText: discountText,
      onPressFirstButton: () => navigation.navigate(LOGGED_IN_SCREENS.SUBSCRIPTIONS, { screen: SUBSCRIPTIONS_SCREENS.INDEX }),
      onPressSecondButton: () => navigation.navigate(LOGGED_IN_SCREENS.SUBSCRIPTIONS, { screen: SUBSCRIPTIONS_SCREENS.INDEX }),
    };
  } else if (!trial && extraInquiriesRestriction && !isExpired) {
    return {
      message: t('subscription.extra_inquiries_message'),
      buttonText: t('subscription.extra_inquiries_button_text'),
      firstButtonType: 'outlined',
      disabled: true,
      costText: t('subscription.extra_inquiries_cost_text'),
      secondButtonType: 'filled',
      firstButtonTextColor: 'blue',
      secondButtonTextColor: 'white',
      lowerButtonText: t('subscription.extra_inquiries_lower_button_text'),
      discountText: t('subscriptions:discount_text_other_subscription', {
        discountAmount: discountData.discountAmount + (discountData.annualDiscount && !discountData.discount ? '%' : ' MDL'),
      }),
      onPressFirstButton: () => {},
      onPressSecondButton: () => navigation.navigate(LOGGED_IN_SCREENS.SUBSCRIPTIONS, { screen: SUBSCRIPTIONS_SCREENS.INDEX }),
    };
  } else if (!trial && !extraInquiriesRestriction && !isExpired && !isCreditScoreIncluded) {
    return {
      message: t('subscription.no_credit_score_message'),
      buttonText: t('subscription.no_credit_score_button_text'),
      firstButtonType: 'filled',
      disabled: false,
      secondButtonType: 'outlined',
      firstButtonTextColor: 'white',
      secondButtonTextColor: 'blue',
      costText: t('subscription.no_credit_score_cost_text', { creditScorePrice }),
      lowerButtonText: t('subscription.no_credit_score_lower_button_text'),
      discountText: undefined,
      secondaryText: t('subscription.no_credit_score_discount_text'),
      onPressFirstButton: onPayReport,
      onPressSecondButton: () => navigation.navigate(LOGGED_IN_SCREENS.SUBSCRIPTIONS, { screen: SUBSCRIPTIONS_SCREENS.INDEX }),
    };
  } else if (!trial && !extraInquiriesRestriction && !isExpired && isCreditScoreIncluded) {
    return {
      message: t('subscription.credit_score_included_message'),
      buttonText: t('subscription.credit_score_included_button_text'),
      firstButtonType: 'filled',
      disabled: false,
      secondButtonType: 'outlined',
      firstButtonTextColor: 'white',
      secondButtonTextColor: 'blue',
      costText: t('subscription.credit_score_included_cost_text'),
      lowerButtonText: t('subscription.credit_score_included_lower_button_text'),
      secondaryText: t('subscription.credit_score_included_discount_text'),
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

export default getSubscriptionDetails;
