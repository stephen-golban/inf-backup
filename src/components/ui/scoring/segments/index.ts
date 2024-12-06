import { t } from 'i18next';
import { segmentColors } from '../constants';

import type { Segment } from '../typings';

export const segments: Segment[] = [
  {
    color: segmentColors.crimsonRed,
    image: require('@assets/images/scoring/grown.png'),
    label: 'logged_in:credit_report:scoring:scoring_negative',
  },
  {
    color: segmentColors.goldenYellow,
    image: require('@assets/images/scoring/fair.png'),
    label: 'logged_in:credit_report:scoring:scoring_neutral',
  },
  {
    color: segmentColors.limeGreen,
    image: require('@assets/images/scoring/lucky.png'),
    label: 'logged_in:credit_report:scoring:scoring_positive',
  },
  {
    color: segmentColors.forestGreen,
    image: require('@assets/images/scoring/best.png'),
    label: 'logged_in:credit_report:scoring:scoring_excelent',
  },
];
