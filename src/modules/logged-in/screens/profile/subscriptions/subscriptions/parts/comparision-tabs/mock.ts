import { translate } from '@translations/translate';

import type { I18nKey } from '@translations/locales';

const getTag = (tag: string) => translate(`profile:subscriptions:index:comparison:interval:${tag}` as I18nKey);
const getFeature = (feature: string) => translate(`profile:subscriptions:index:comparison:features:${feature}` as I18nKey);

export const COMPARISION_PLANS = {
  smart: {
    name: translate('profile:subscriptions:index:comparison:plans:smart_plan'),
    features: [
      { title: getFeature('1'), disabled: false, hasInfo: false, tag: undefined },
      { title: getFeature('2'), disabled: false, hasInfo: false, tag: undefined },
      { title: getFeature('3'), disabled: false, hasInfo: true, tag: undefined },
      { title: getFeature('4'), disabled: false, hasInfo: false, tag: undefined },
      { title: getFeature('5'), disabled: true, hasInfo: false, tag: undefined },
      { title: getFeature('6'), disabled: true, hasInfo: false, tag: undefined },
      { title: getFeature('7'), disabled: false, hasInfo: false, tag: undefined },
      { title: getFeature('8'), disabled: false, hasInfo: false, tag: getTag('monthly') },
      { title: getFeature('9'), disabled: false, hasInfo: true, tag: undefined },
    ],
    price: 87,
    discount: 10,
  },
  genius: {
    name: translate('profile:subscriptions:index:comparison:plans:genius_plan'),
    features: [
      { title: getFeature('1'), disabled: false, hasInfo: false, tag: undefined },
      { title: getFeature('2'), disabled: false, hasInfo: false, tag: undefined },
      { title: getFeature('3'), disabled: false, hasInfo: true, tag: undefined },
      { title: getFeature('4'), disabled: false, hasInfo: false, tag: undefined },
      { title: getFeature('5'), disabled: false, hasInfo: true, tag: undefined },
      { title: getFeature('6'), disabled: false, hasInfo: false, tag: undefined },
      { title: getFeature('7'), disabled: false, hasInfo: false, tag: undefined },
      { title: getFeature('8'), disabled: false, hasInfo: false, tag: getTag('weekly') },
      { title: getFeature('9'), disabled: false, hasInfo: true, tag: undefined },
    ],
    price: 174,
    discount: 10,
  },
  premium: {
    name: translate('profile:subscriptions:index:comparison:plans:premium_plan'),
    features: [
      { title: getFeature('1'), disabled: false, hasInfo: false, tag: undefined },
      { title: getFeature('2'), disabled: false, hasInfo: false, tag: undefined },
      { title: getFeature('3'), disabled: false, hasInfo: false, tag: getTag('unlimited') },
      { title: getFeature('4'), disabled: false, hasInfo: false, tag: undefined },
      { title: getFeature('5'), disabled: false, hasInfo: false, tag: getTag('unlimited') },
      { title: getFeature('6'), disabled: false, hasInfo: false, tag: undefined },
      { title: getFeature('7'), disabled: false, hasInfo: false, tag: undefined },
      { title: getFeature('8'), disabled: false, hasInfo: false, tag: getTag('weekly') },
      { title: getFeature('9'), disabled: false, hasInfo: false, tag: undefined },
    ],
    price: 1950,
    discount: 35,
  },
};
