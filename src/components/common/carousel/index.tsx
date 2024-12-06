import * as React from 'react';
import { Dimensions } from 'react-native';

import { View } from '../view';

import Carousel from 'react-native-reanimated-carousel';

interface CarouselComponentProps<T> {
  data: T[];
  renderItem: (item: { item: T; index: number }) => JSX.Element;
  loop?: boolean;
  hasPagination?: boolean;
  scrollAnimationDuration?: number;
}

const CarouselComponent = <T,>({
  data,
  renderItem,
  loop = true,
  hasPagination = true,
  scrollAnimationDuration = 0,
}: CarouselComponentProps<T>) => {
  const width = Dimensions.get('window').width - 20;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <>
      <Carousel
        loop={loop}
        width={width}
        height={width / 3.5}
        data={data}
        scrollAnimationDuration={scrollAnimationDuration}
        renderItem={renderItem}
        onSnapToItem={index => setCurrentIndex(index)}
      />
      {hasPagination && (
        <View row center>
          {data.map((_, index) => (
            <View key={index} w={8} h={8} br={4} mb="sm" mx="xs" bg={currentIndex === index ? 'richBlue' : 'lightBlue'} />
          ))}
        </View>
      )}
    </>
  );
};

export { CarouselComponent };
