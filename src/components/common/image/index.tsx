import React from 'react';
import { useTheme } from '@theme/index';

import { View } from '../view';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator } from '../activity-indicator';

import type { ImageProps } from './type';

const noImgAvailable = require('@assets/images/no-img-available.jpeg');

const Image: React.FC<ImageProps> = props => {
  const { source, resizeMode = FastImage.resizeMode.cover, loading, loaderSize = 'large', ...rest } = props;
  const { layout } = useTheme();
  const [isLoading, setLoading] = React.useState(true);
  const [errOccured, setErrOccured] = React.useState(false);

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setErrOccured(true);
  };

  const getSource = () => {
    if (errOccured) {
      return noImgAvailable;
    }
    if (source) {
      if (typeof source === 'object') {
        const uri = source.uri ? source.uri : noImgAvailable;
        return { uri: uri.toString(), priority: FastImage.priority.high };
      }
      return source;
    }
    return { uri: noImgAvailable, priority: FastImage.priority.high };
  };

  const SOURCE = getSource();

  return (
    <View overflow="hidden" flex={1} {...rest}>
      <FastImage onError={handleError} resizeMode={resizeMode} style={[layout.fullSize]} onLoadEnd={handleLoadEnd} source={SOURCE} />
      {(isLoading || loading) && (
        <View center absoluteFill fullSize>
          <ActivityIndicator size={loaderSize} color="black" />
        </View>
      )}
    </View>
  );
};

export { Image, type ImageProps };
