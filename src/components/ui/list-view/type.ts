import type { FlatListProps } from 'react-native';

import type { FlashListProps } from '@shopify/flash-list';

export type ListViewProps<T> = (
  | ({
      type: 'flatlist';
    } & CustomOmit<FlatListProps<T>, 'onRefresh' | 'refreshControl' | 'refreshing'>)
  | ({ type?: 'flashlist' | undefined } & CustomOmit<FlashListProps<T>, 'onRefresh' | 'refreshControl' | 'refreshing'>)
) & {
  /**
   * Function when refreshing
   * @default undefined
   */
  onRefresh?: () => void;

  /**
   * Function when scroll to end
   * @default undefined
   */
  onLoadMore?: () => void;

  /**
   * Enable to load more when scroll to end
   * @default false
   */
  canLoadMore?: boolean;

  /**
   * State of Refresh Control
   * @default false
   */
  refreshing?: boolean;

  /**
   * Enable to render Refresh Control
   * @default true
   */
  canRefresh?: boolean;
};
