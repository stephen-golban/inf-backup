import type { FastImageProps } from '@d11/react-native-fast-image';
import type { ActivityIndicatorProps, ViewProps } from '@components/common';

export type ImageProps = Pick<FastImageProps, 'source' | 'resizeMode'> &
  ViewProps & {
    loading?: boolean;
    loaderSize?: ActivityIndicatorProps['size'];
  };
