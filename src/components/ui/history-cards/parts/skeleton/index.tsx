import React from 'react';
import { View } from '@components/common';
import Animated from 'react-native-reanimated';
import { useShimmerAnimation } from '../../hooks';

const SkeletonLoader: React.FC = () => {
  const animatedStyle = useShimmerAnimation();

  return (
    <View bg="lightBlue" row between p="md" shadow="card" br={10} center>
      <View row center g="sm" maxw={'80%'}>
        <View bg="black_20" w={100} h={12} br={4} overflow="hidden">
          <Animated.View
            style={[
              {
                width: '150%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              animatedStyle,
            ]}
          />
        </View>
      </View>
      <View bg="gray_41" w={50} h={12} br={4} overflow="hidden">
        <Animated.View
          style={[
            {
              width: '150%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
};

export { SkeletonLoader };
