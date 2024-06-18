import { calculateRatioFontSize } from '@library/scale';

import type { BadgePlacement } from './type';
import type { ViewProps } from '@components/common';

const useBadgePlacement = (value: number, placement: `${BadgePlacement}`, size: number, offset: number) => {
  const calculatedOffset = -Math.abs(offset);

  const [badgeY, badgeX] = placement.split('-');

  const fontSize = calculateRatioFontSize(value, size);

  const position = {
    [badgeY]: calculatedOffset,
    [badgeX]: calculatedOffset,
  } as ViewProps;

  return { position, fontSize };
};

export { useBadgePlacement };
