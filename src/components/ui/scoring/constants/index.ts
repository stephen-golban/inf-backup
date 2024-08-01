import type { NonUndefined } from '../typings';

export const segmentColors: Record<string, NonUndefined<React.CSSProperties['color']>> = {
  crimsonRed: 'rgba(252,54,50, 1)',
  tangerineOrange: 'rgba(253,108,0, 1)',
  goldenYellow: 'rgba(254,194,0, 1)',
  limeGreen: 'rgba(200,221,20, 1)',
  forestGreen: 'rgba(107,196,60, 1)',
};

export const commonColors: Record<string, NonUndefined<React.CSSProperties['color']>> = {
  white: 'rgb(255,255,255)',
  offWhite: 'rgb(245, 245, 245)',
  lightGray: 'rgb(220,220,220)',
  slateGray: 'rgb(97,97,97)',
  charcoalGray: 'rgb(64,64,64)',
  ashGray: 'rgb(170,170,170)',
};

export const segmentThresholds: number[] = [400, 550, 600, 650, 1000];
