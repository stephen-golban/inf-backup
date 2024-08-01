import { segmentColors } from '../constants';
import type { ArrowLength } from '../typings';

export const segmentTextPositions = [
  { x: 0, y: 68, angle: -73 },
  { x: 60, y: 2, angle: -25 },
  { x: 140, y: 2, angle: 20 },
  { x: 198, y: 60, angle: 73 },
];

export const segmentImagePositions = [
  { x: 16, y: 65, angle: 0 },
  { x: 60, y: 25, angle: 0 },
  { x: 115, y: 25, angle: 0 },
  { x: 160, y: 60, angle: 0 },
];

const ratingColors = [
  { max: 550, color: segmentColors.crimsonRed },
  { max: 600, color: segmentColors.goldenYellow },
  { max: 650, color: segmentColors.limeGreen },
  { max: 1000, color: segmentColors.forestGreen },
];

export const creditScoringTexts = [
  { max: 550, key: 'grown' },
  { max: 600, key: 'fair' },
  { max: 650, key: 'lucky' },
  { max: 1000, key: 'best' },
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

const segments = [
  { min: 0, max: 550, angleRange: [-100, -55] },
  { min: 551, max: 600, angleRange: [-50, -2] },
  { min: 601, max: 650, angleRange: [2, 50] },
  { min: 651, max: 1000, angleRange: [55, 100] },
];

export const calculateArrowAngleDegree = (rating: number): number => {
  for (const segment of segments) {
    if (rating >= segment.min && rating <= segment.max) {
      const [startAngle, endAngle] = segment.angleRange;
      const normalizedRating = (rating - segment.min) / (segment.max - segment.min);
      return startAngle + normalizedRating * (endAngle - startAngle);
    }
  }

  if (rating < segments[0].min) {
    return segments[0].angleRange[0];
  } else if (rating > segments[segments.length - 1].max) {
    return segments[segments.length - 1].angleRange[1];
  }

  return -90;
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
