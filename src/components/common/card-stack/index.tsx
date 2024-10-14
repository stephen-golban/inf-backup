import React from 'react';

import { useSharedValue } from 'react-native-reanimated';

import Card from './Card';
import { View } from '../view';

interface ICardStack<T> {
  data: T[];
  maxVisibleItems?: number;
  setCurrentCard?: (item: T) => void;
  renderItem(item: T, isFirst: boolean): JSX.Element;
}

const _CardStack = <T,>({ data, renderItem, setCurrentCard, maxVisibleItems = 3 }: ICardStack<T>, ref: React.Ref<any>) => {
  const [newData, setNewData] = React.useState<T[]>(data);
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

  React.useEffect(() => {
    setCurrentCard?.(newData[currentIndex]);
  }, [currentIndex, newData]);

  return (
    <View fill center>
      {newData.map((item, index) => {
        if (index > currentIndex + maxVisibleItems || index < currentIndex) {
          return null;
        }

        const isFirst = index === currentIndex;

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
            maxVisibleItems={maxVisibleItems}
            setCurrentIndex={setCurrentIndex}
            children={renderItem(item, isFirst)}
          />
        );
      })}
    </View>
  );
};

export const CardStack = React.forwardRef(_CardStack) as <T>(props: ICardStack<T> & { ref?: React.Ref<any> }) => React.ReactElement;
