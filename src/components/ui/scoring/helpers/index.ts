import { segmentColors, segmentThresholds } from '../constants';

import type { ArrowLength } from '../typings';

export const segmentTextPositions = [
  { x: 0, y: 68, angle: -73 },
  { x: 37, y: 15, angle: -37 },
  { x: 100, y: -5, angle: 0 },
  { x: 160, y: 15, angle: 37 },
  { x: 200, y: 68, angle: 73 },
];

export const segmentImagePositions = [
  { x: 16, y: 65, angle: 0 },
  { x: 45, y: 30, angle: 0 },
  { x: 88, y: 15, angle: 0 },
  { x: 130, y: 30, angle: 0 },
  { x: 160, y: 65, angle: 0 },
];

const ratingColors = [
  { max: segmentThresholds[0], color: segmentColors.crimsonRed },
  { max: segmentThresholds[1], color: segmentColors.tangerineOrange },
  { max: segmentThresholds[2], color: segmentColors.goldenYellow },
  { max: segmentThresholds[3], color: segmentColors.limeGreen },
  { max: segmentThresholds[4], color: segmentColors.forestGreen },
];

export const creditScoringTexts = [
  { max: segmentThresholds[0], key: 'grown' },
  { max: segmentThresholds[1], key: 'medium' },
  { max: segmentThresholds[2], key: 'fair' },
  { max: segmentThresholds[3], key: 'lucky' },
  { max: segmentThresholds[4], key: 'best' },
];

export const getRatingColor = (rating: number = 0): string => {
  for (const { max, color } of ratingColors) {
    if (rating <= max) {
      return color;
    }
  }

  return segmentColors.crimsonRed;
};

const arrowPaths = {
  small: 'M 100,40 Q 100,40 95,80 L 105,80 Q 101,45 100,40',
  medium: 'M 100,20 Q 98,25 95,90 L 105,90 Q 102,25 100,20',
  big: 'M 100,10 Q 98,15 95,90 L 105,90 Q 103,15 100,10',
};

export const getArrowLength = (length: ArrowLength = 'small'): string => {
  return arrowPaths[length] || arrowPaths.small;
};

const arrowAngles = [
  { max: segmentThresholds[0], angle: -81 },
  { max: segmentThresholds[1], angle: -43 },
  { max: segmentThresholds[2], angle: 0 },
  { max: segmentThresholds[3], angle: 43 },
  { max: segmentThresholds[4], angle: 81 },
];

export const calculateArrowAngleDegree = (rating: number): number => {
  for (const { max, angle } of arrowAngles) {
    if (rating <= max) {
      return angle;
    }
  }
  return 0;
};

export const calculateTopSegmentPathBorder = (index: number, total: number): string => {
  return calculateSegmentPath(index, total, 100, 121, describeTopSegmentBorder);
};

export const calculateTopSegmentPath = (index: number, total: number): string => {
  return calculateSegmentPath(index, total, 140, 110, describeTopSegment);
};

type SegmentDescriptor = (cx: number, cy: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) => string;

export const calculateSegmentPath = (
  index: number,
  total: number,
  innerRadius: number = 37,
  outerRadius: number = 100,
  descriptor: SegmentDescriptor = describeSegment,
): string => {
  const angle = 180 / total;
  const startAngle = -90 + angle * index;
  const endAngle = startAngle + angle;

  return descriptor(100, 100, innerRadius, outerRadius, startAngle, endAngle);
};

const describeTopSegmentBorder = (
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string => {
  const startOuter = polarToCartesian(cx, cy, outerRadius, endAngle);
  const endOuter = polarToCartesian(cx, cy, outerRadius, startAngle);

  return ['M', startOuter.x, startOuter.y, 'A', outerRadius, outerRadius, 0, 0, 0, endOuter.x, endOuter.y].join(' ');
};

const describeTopSegment = (
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string => {
  const startOuter = polarToCartesian(cx, cy, outerRadius, endAngle);
  const endOuter = polarToCartesian(cx, cy, outerRadius, startAngle);

  return ['M', startOuter.x, startOuter.y, 'A', outerRadius, outerRadius, 0, 0, 0, endOuter.x, endOuter.y].join(' ');
};

const describeSegment = (
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string => {
  const startOuter = polarToCartesian(cx, cy, outerRadius, endAngle);
  const endOuter = polarToCartesian(cx, cy, outerRadius, startAngle);
  const startInner = polarToCartesian(cx, cy, innerRadius, endAngle);
  const endInner = polarToCartesian(cx, cy, innerRadius, startAngle);

  return [
    'M',
    startOuter.x,
    startOuter.y,
    'A',
    outerRadius,
    outerRadius,
    0,
    0,
    0,
    endOuter.x,
    endOuter.y,
    'L',
    endInner.x,
    endInner.y,
    'A',
    innerRadius,
    innerRadius,
    0,
    0,
    1,
    startInner.x,
    startInner.y,
    'Z',
  ].join(' ');
};

export const calculateSeparatorPath = (index: number, total: number) => {
  const angle = 180 / total;
  const startAngle = -90 + angle * index;

  return describeSeparator(100, 100, 37, 120, startAngle);
};

const describeSeparator = (cx: number, cy: number, innerRadius: number, outerRadius: number, startAngle: number): string => {
  const startOuter = polarToCartesian(cx, cy, outerRadius, startAngle);
  const endOuter = polarToCartesian(cx, cy, innerRadius, startAngle);

  return ['M', startOuter.x, startOuter.y, 'L', endOuter.x, endOuter.y].join(' ');
};

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};
