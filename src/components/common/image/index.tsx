import React from 'react';

import { useTheme } from '@theme/index';

import FastImage from 'react-native-fast-image';
import { ActivityIndicator, View } from '@components/common';

import type { ImageProps } from './type';

export const Image: React.FC<ImageProps> = props => {
  const { source, resizeMode = FastImage.resizeMode.cover, loading, loaderSize = 'large', ...rest } = props;

  const { layout } = useTheme();
  const [isLoading, setLoading] = React.useState(true);
  const [errOccured, setErrOccured] = React.useState<null | boolean>(null);

  const handleLoadStart = () => {
    setLoading(true);
    setErrOccured(null);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setErrOccured(true);
  };

  const SOURCE = React.useMemo(() => {
    if (errOccured) {
      return require('@assets/images/no-img-available.jpeg');
    }
    if (source) {
      if (typeof source === 'object') {
        if (source.uri) {
          return { uri: source.uri, priority: FastImage.priority.high };
        }
        return require('@assets/images/no-img-available.jpeg');
      }
      return source;
    }
    return require('@assets/images/no-img-available.jpeg');
  }, [errOccured, source]);

  return (
    <View overflow="hidden" fill {...rest}>
      <FastImage
        source={SOURCE}
        onError={handleError}
        resizeMode={resizeMode}
        style={[layout.fullSize]}
        onLoadEnd={handleLoadEnd}
        onLoadStart={handleLoadStart}
      />
      {(isLoading || loading) && (
        <View center absoluteFill fullSize bg="black_50">
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export type { ImageProps };
