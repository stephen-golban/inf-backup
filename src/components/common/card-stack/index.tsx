import React from 'react';

import { useSharedValue } from 'react-native-reanimated';

import Card from './Card';
import { View } from '../view';

interface ICardStack<T extends any> {
  data: T[];
  maxVisibleItems?: number;
  renderItem(item: T, isFirst: boolean): JSX.Element;
}

const _CardStack = <T extends any>({ data, renderItem, maxVisibleItems = 3 }: ICardStack<T>, ref: React.Ref<any>) => {
  const [newData, setNewData] = React.useState(data);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const animatedValue = useSharedValue(0);
  const cardRefs = React.useRef<(any | null)[]>([]);

  React.useImperativeHandle(ref, () => ({
    swipe: (direction = 1) => {
      if (cardRefs.current[currentIndex]) {
        cardRefs.current[currentIndex].swipe(direction);
      }
    },
  }));

  return (
    <View fill center>
      {newData.map((item, index) => {
        if (index > currentIndex + maxVisibleItems || index < currentIndex) {
          return null;
        }

        return (
          <Card
            ref={el => (cardRefs.current[index] = el)}
            key={index}
            data={newData}
            index={index}
            dataLength={newData.length}
            animatedValue={animatedValue}
            currentIndex={currentIndex}
            setNewData={setNewData as any}
            setCurrentIndex={setCurrentIndex}
            maxVisibleItems={maxVisibleItems}
            children={renderItem(item, index === currentIndex)}
          />
        );
      })}
    </View>
  );
};

export const CardStack = React.forwardRef(_CardStack);
