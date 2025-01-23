import { Color } from '@theme/colors';
import { isAfter, parseISO } from 'date-fns';
import { PurchasedSubscription } from '@typings/responses';
import { LOGGED_IN_SCREENS, OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps, SUBSCRIPTIONS_SCREENS } from '@typings/navigation';
import { useTranslation } from '@library/hooks';
import { useAppDataCheckStore } from '@store/data-check';

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
  onPressSecondButton: (id: number | undefined) => void;
}

const getReportSummaryOptions = (
  subscription: PurchasedSubscription | undefined,
  navigation: OwnDataCheckScreenProps<any>['navigation'],
  onPressUpdate: () => void,
  onPayReport: (withoutBottomSheet?: boolean) => void,
): SubscriptionResult => {
  const { t } = useTranslation();

  const report = useAppDataCheckStore(state => state.creditReportSummary);
  const reportId = useAppDataCheckStore(state => state.inquiry?.basicServices.creditReportId);

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
  const creditScorePrice = creditScoreService?.prices[0]?.price || 0;

  // let discountText = undefined;
  // if (discountData?.discount || discountData?.annualDiscount) {
  //   discountText = t('subscriptions:discount_text_other_subscription', {
  //     discountAmount: discountData.discountAmount + (discountData.annualDiscount && !discountData.discount ? '%' : ' MDL'),
  //   });
  // }
  if ((trial && !isExpired) || isExpired) {
    return {
      message: t('ui:subscription:trial_message'),
      buttonText: t('logged_in:credit_report:credit_report_summary_options:choose_subscription'),
      firstButtonTextColor: 'white',
      secondButtonTextColor: 'blue',
      firstButtonType: 'filled',
      disabled: false,
      costText: t('ui:subscription:trial_cost_text', { price: 87 }),
      secondButtonType: 'outlined',
      lowerButtonText: t('logged_in:credit_report:credit_report_summary_options:for_complete_data_choose_a_subscription'),
      discountText: t('subscriptions:annual_discount_text', { discountAmount: '35%' }),
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
      lowerButtonText: t('logged_in:credit_report:credit_report_summary_options:download_complete_report'),
      discountText: t('subscriptions:discount_text_other_subscription', {
        discountAmount: '35%',
      }),
      onPressFirstButton: () => {},
      onPressSecondButton: () =>
        navigation.navigate(OWN_DATA_CHECK_SCREENS.DownloadReport, {
          id: reportId || 0,
        }),
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
      lowerButtonText: t('logged_in:credit_report:credit_report_summary_options:download_complete_report'),
      discountText: t('ui:subscription:no_credit_score_discount_text'),
      secondaryText: t('ui:subscription:no_credit_score_discount_text'),
      onPressFirstButton: () => onPayReport(true),
      onPressSecondButton: () =>
        navigation.navigate(OWN_DATA_CHECK_SCREENS.DownloadReport, {
          id: reportId || 0,
        }),
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
      lowerButtonText: t('logged_in:credit_report:credit_report_summary_options:download_complete_report'),
      discountText: t('ui:subscription:credit_score_included_discount_text'),
      onPressFirstButton: onPressUpdate,
      onPressSecondButton: () =>
        navigation.navigate(OWN_DATA_CHECK_SCREENS.DownloadReport, {
          id: reportId || 0,
        }),
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
