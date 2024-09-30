import type { ViewProps } from '../view';
import type { Color } from '@theme/colors';
import type { SafeAreaViewProps } from '../safe-area-view';
import type { Edge } from 'react-native-safe-area-context';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export type ScreenProps = {
  /**
   * Displays a loader if true
   * @default undefined
   */
  loading?: boolean;

  /**
   * Status bar style
   * @default dark-content
   */
  statusBarStyle?: 'light-content' | 'dark-content';

  /**
   * Using safe area on ios
   * @default false
   */
  unsafe?: boolean;

  /**
   * Visibility status bar
   * @default true
   */
  hiddenStatusBar?: boolean;

  /**
   * Color of loading indicator
   */
  loaderColor?: Color;
  /**
   * Color of status bar for both Android/IOS
   */
  statusColor?: Color;

  /**
   * Color of inset bottom
   * @default #ffffff
   */
  bottomInsetColor?: Color;

  /**
   * Color of inset left
   * @default #ffffff
   */
  leftInsetColor?: Color;

  /**
   * Color of inset left
   * @default #ffffff
   */
  rightInsetColor?: Color;

  /**
   * Using scroll content
   * @default false
   */
  scroll?: boolean;

  /**
   * Inset for safe area view
   * @default undefined
   */
  excludeEdges?: 'all' | Edge[];

  /**
   * Animated onScroll
   * @default undefined
   */
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

  onRefresh?: (() => void) | undefined;

  removeInsets?: boolean;
} & SafeAreaViewProps &
  ViewProps;

export type InsetComponentProps = Pick<
  ScreenProps,
  'statusColor' | 'unsafe' | 'hiddenStatusBar' | 'bottomInsetColor' | 'leftInsetColor' | 'rightInsetColor' | 'statusBarStyle'
> & {
  edges: Edge[];
};

export interface InsetProps {
  color?: Color;
  height: number;
  width: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export type ScreenComponentProps = CustomOmit<ScreenProps, 'unsafe' | 'scroll' | 'excludeEdges'> & {
  edges: Edge[];
  actualUnsafe: boolean;
};
