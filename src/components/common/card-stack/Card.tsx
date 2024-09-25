import React from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, { SharedValue, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { View } from '../view';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface ICard<T extends any> {
  data: T[];
  setNewData: React.Dispatch<React.SetStateAction<T[]>>;
  maxVisibleItems: number;
  index: number;
  dataLength: number;
  currentIndex: number;
  animatedValue: SharedValue<number>;
  children: React.ReactNode;
  setCurrentIndex(arg: number): void;
}

const AnimatedView = Animated.createAnimatedComponent(View);

const Card = <T extends any>(
  { data, setNewData, maxVisibleItems, children, index, dataLength, animatedValue, currentIndex, setCurrentIndex }: ICard<T>,
  ref: React.Ref<any>,
) => {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);

  const triggerSwipeAnimation = (directionValue: number) => {
    'worklet';

    translateX.value = withTiming(width * directionValue, {}, () => {
      runOnJS(setNewData)([...data, data[currentIndex]]);
      runOnJS(setCurrentIndex)(currentIndex + 1);
    });
    animatedValue.value = withTiming(currentIndex + 1);
  };

  const resetSwipeAnimation = () => {
    'worklet';

    translateX.value = withTiming(0, { duration: 500 });
    animatedValue.value = withTiming(currentIndex, { duration: 500 });
  };

  React.useImperativeHandle(ref, () => ({
    swipe: (directionValue = 1) => {
      triggerSwipeAnimation(directionValue);
    },
  }));

  const pan = Gesture.Pan()
    .onUpdate(e => {
      'worklet';

      const isSwipeRight = e.translationX > 0;
      direction.value = isSwipeRight ? 1 : -1;

      if (currentIndex === index) {
        translateX.value = e.translationX;
        animatedValue.value = interpolate(Math.abs(e.translationX), [0, width], [index, index + 1]);
      }
    })
    .onEnd(e => {
      'worklet';

      if (currentIndex === index) {
        if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
          triggerSwipeAnimation(direction.value);
        } else {
          resetSwipeAnimation();
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';

    const currentItem = index === currentIndex;
    const translateY = interpolate(animatedValue.value, [index - 1, index], [-15, 0]);
    const scale = interpolate(animatedValue.value, [index - 1, index], [0.9, 1]);
    const rotateZ = interpolate(Math.abs(translateX.value), [0, width], [0, 20]);
    const opacity = interpolate(animatedValue.value + maxVisibleItems, [index, index + 1], [0, 1]);

    return {
      transform: [
        { translateY: currentItem ? 0 : translateY },
        { scale: currentItem ? 1 : scale },
        { translateX: translateX.value },
        { rotateZ: currentItem ? `${direction.value * rotateZ}deg` : '0deg' },
      ],
      opacity: index < currentIndex + maxVisibleItems ? 1 : opacity,
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <AnimatedView absolute style={[{ zIndex: dataLength - index }, animatedStyle]}>
        {children}
      </AnimatedView>
    </GestureDetector>
  );
};

export default React.forwardRef(Card);
