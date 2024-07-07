import { I18nKey } from '@translations/locales';
import { SubscriptionDuration } from '@typings/responses/subscriptions/all-subscriptions';

export const calculateMonthlyEquivalent = (price: number, duration: SubscriptionDuration) => {
  switch (duration) {
    case SubscriptionDuration.MONTH_3:
      return price / 3;
    case SubscriptionDuration.MONTH_6:
      return price / 6;
    case SubscriptionDuration.MONTH_12:
      return price / 12;
    default:
      return null;
  }
};

export const calculateDiscountedPrice = (price: number, discountAmount: number, discountType: string) => {
  let discountedPrice = price;

  if (discountType === 'AMOUNT') {
    discountedPrice -= discountAmount;
  } else if (discountType === 'PERCENT') {
    discountedPrice -= (discountedPrice * discountAmount) / 100;
  }

  return discountedPrice;
};

export const sortSubscriptions = (a: any, b: any) => {
  const durationOrder: any = {
    WEEK_1: 1,
    WEEK_2: 2,
    MONTH_1: 3,
    MONTH_3: 4,
    MONTH_6: 5,
    MONTH_9: 6,
    MONTH_12: 7,
  };

  return durationOrder[a.subscriptionDuration] - durationOrder[b.subscriptionDuration];
};

export const getSubscriptionDurationText = (
  duration: SubscriptionDuration,
  t: (key: I18nKey, options?: { [x: string]: unknown } | undefined) => string,
) => {
  switch (duration) {
    case SubscriptionDuration.WEEK_1:
      return t('profile:my_account:subscription_duration:week_1');
    case SubscriptionDuration.WEEK_2:
      return t('profile:my_account:subscription_duration:week_2');
    case SubscriptionDuration.MONTH_1:
      return t('profile:my_account:subscription_duration:month_1');
    case SubscriptionDuration.MONTH_3:
      return t('profile:my_account:subscription_duration:month_3');
    case SubscriptionDuration.MONTH_6:
      return t('profile:my_account:subscription_duration:month_6');
    case SubscriptionDuration.MONTH_9:
      return t('profile:my_account:subscription_duration:month_9');
    case SubscriptionDuration.MONTH_12:
      return t('profile:my_account:subscription_duration:month_12');
    default:
      return duration;
  }
};

export const getPaymentFrequencyText = (
  duration: SubscriptionDuration,
  t: (key: I18nKey, options?: { [x: string]: unknown } | undefined) => string,
) => {
  switch (duration) {
    case SubscriptionDuration.WEEK_1:
    case SubscriptionDuration.WEEK_2:
      return t('profile:my_account:payment_frequency:weekly');
    case SubscriptionDuration.MONTH_1:
      return t('profile:my_account:payment_frequency:monthly');
    case SubscriptionDuration.MONTH_3:
      return t('profile:my_account:payment_frequency:quarterly');
    case SubscriptionDuration.MONTH_6:
      return t('profile:my_account:payment_frequency:semi_annually');
    case SubscriptionDuration.MONTH_9:
      return t('profile:my_account:payment_frequency:three_times_a_year');
    case SubscriptionDuration.MONTH_12:
      return t('profile:my_account:payment_frequency:annually');
    default:
      return t('profile:my_account:payment_frequency:unknown');
  }
};
