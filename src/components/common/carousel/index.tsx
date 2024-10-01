import * as React from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

interface CarouselComponentProps<T> {
  data: T[];
  renderItem: (item: { item: T; index: number }) => JSX.Element;
  loop?: boolean;
  scrollAnimationDuration?: number;
}

const CarouselComponent = <T,>({ data, renderItem, loop = true, scrollAnimationDuration = 1000 }: CarouselComponentProps<T>) => {
  const width = Dimensions.get('window').width - 20;

  return (
    <Carousel
      loop={loop}
      width={width}
      height={width / 3.5}
      data={data}
      scrollAnimationDuration={scrollAnimationDuration}
      renderItem={renderItem}
    />
  );
};

export { CarouselComponent };
