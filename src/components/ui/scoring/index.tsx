import React from 'react';
import { Dimensions, type ImageSourcePropType } from 'react-native';

import Svg, { Circle, G, Image, Path, Text as SvgText, TextPath } from 'react-native-svg';

import {
  getRatingColor,
  getArrowLength,
  calculateSegmentPath,
  segmentTextPositions,
  segmentImagePositions,
  calculateSeparatorPath,
  calculateTopSegmentPath,
  calculateArrowAngleDegree,
  calculateTopSegmentPathBorder,
  calculateTextArcPath,
} from './helpers';

import { segments } from './segments';
import { commonColors } from './constants';

const { width } = Dimensions.get('screen');

import type { ArrowLength } from './typings';
import { View } from '@components/common';
import { useAppStore } from '@store/app';
import { useTranslation } from '@library/hooks';

type Data = Array<{
  label: string;
  image: ImageSourcePropType;
  color: React.CSSProperties['color'];
}>;

interface ScoringProps {
  data?: Data;
  rating: number;
  arrowLength?: ArrowLength;
  separatorColor?: React.CSSProperties['color'];
  topRainbowInsideColor?: React.CSSProperties['color'];
  ScoringArrowColor?: React.CSSProperties['color'];
  topRainbowOutsideColor?: React.CSSProperties['color'];
  ScoringArrowInsideCircleColor?: React.CSSProperties['color'];
}

const Scoring: React.FC<ScoringProps> = props => {
  const { t } = useTranslation();

  const {
    rating,

    data = segments,

    separatorColor = commonColors.white,

    topRainbowOutsideColor = commonColors.offWhite,
    topRainbowInsideColor = commonColors.lightGray,

    ScoringArrowColor = commonColors.charcoalGray,
    ScoringArrowInsideCircleColor = commonColors.slateGray,

    arrowLength = 'small',
  } = props;

  const { locale } = useAppStore(state => state);

  const textSize = locale === 'ro' ? 7 : locale === 'en' ? 6.5 : 5;

  return (
    <View align="center" justify="center">
      <Svg height={245} width={width * 0.9} viewBox="-22 7 245 85">
        <G origin="100, 100">
          {data.map((segment, index) => (
            <G key={index}>
              <Path key={index} fill={segment.color} d={calculateSegmentPath(index, data.length)} />

              <Path fill="none" strokeWidth="7" stroke={topRainbowOutsideColor} d={calculateTopSegmentPathBorder(index, data.length)} />

              <Path fill="none" strokeWidth="20" stroke={topRainbowInsideColor} d={calculateTopSegmentPath(index, data.length)} />

              <Image
                width="24"
                height="24"
                href={segment.image}
                x={segmentImagePositions[index].x}
                y={segmentImagePositions[index].y}
                transform={`rotate(${segmentImagePositions[index].angle}, ${segmentImagePositions[index].x}, ${segmentImagePositions[index].y})`}
              />

              {index > 0 && index < data.length && (
                <Path fill="none" strokeWidth="2" stroke={separatorColor} d={calculateSeparatorPath(index, data.length)} />
              )}

              <Path
                id={`arcPath${index}`}
                d={calculateTextArcPath(100, 100, 107, segmentTextPositions[index].angle - 10, segmentTextPositions[index].angle + 10)}
                fill="none"
              />
            </G>
          ))}

          <Path
            strokeWidth={3}
            origin="100, 90"
            strokeLinecap="round"
            fill={ScoringArrowColor}
            stroke={ScoringArrowColor}
            d={getArrowLength(arrowLength)}
            rotation={calculateArrowAngleDegree(rating)}
          />

          <Circle cx="100" cy="90" r="12" fill={ScoringArrowColor} />
          <Circle cx="100" cy="90" r="7" fill={ScoringArrowInsideCircleColor} />

          {data.map((segment, index) => {
            return (
              <SvgText key={index} fontSize={textSize} fontWeight="900" fill={commonColors.ashGray}>
                <TextPath href={`#arcPath${index}`}>{t(segment.label)}</TextPath>
              </SvgText>
            );
          })}
        </G>

        <SvgText x="100" y="133" fontSize="28" fontWeight="bold" textAnchor="middle" fill={getRatingColor(rating)}>
          {rating}
        </SvgText>
      </Svg>
    </View>
  );
};

export { Scoring };
