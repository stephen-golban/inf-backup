import { t } from 'i18next';
import { segmentColors } from '../constants';

import type { Segment } from '../typings';

export const segments: Segment[] = [
  {
    color: segmentColors.crimsonRed,
    image: require('@assets/images/scoring/grown.png'),
    label: t(`logged_in:home:own_data_check:credit_scoring:scoring:fair`),
  },
  {
    color: segmentColors.tangerineOrange,
    image: require('@assets/images/scoring/medium.png'),
    label: t(`logged_in:home:own_data_check:credit_scoring:scoring:medium`),
  },
  {
    color: segmentColors.goldenYellow,
    image: require('@assets/images/scoring/fair.png'),
    label: t(`logged_in:home:own_data_check:credit_scoring:scoring:fair`),
  },
  {
    color: segmentColors.limeGreen,
    image: require('@assets/images/scoring/lucky.png'),
    label: t(`logged_in:home:own_data_check:credit_scoring:scoring:lucky`),
  },
  {
    color: segmentColors.forestGreen,
    image: require('@assets/images/scoring/best.png'),
    label: t(`logged_in:home:own_data_check:credit_scoring:scoring:best`),
  },
];
