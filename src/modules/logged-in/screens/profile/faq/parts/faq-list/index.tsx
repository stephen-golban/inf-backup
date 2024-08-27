import React from 'react';
import { FilledButton, Image, OutlinedButton, Text, View } from '@components/common';

import type { Color } from '@theme/colors';
import { IItemStyles } from '@typings/responses';

interface IFaqList {
  id: number;
  text: string;
  image: string;
  title: string;
  btnTitle: string;
  subTitle: string;
  viewOptions: IItemStyles;
  onPress(): void;
}

const FaqList: React.FC<IFaqList> = ({ id, image, title, subTitle, btnTitle, text, viewOptions, onPress }) => {
  return (
    <View p="sm" bg={viewOptions.background as Color}>
      <View mx="lg">
        {image && (
          <View my="md" center>
            <Image
              source={{ uri: 'data:image/jpeg;base64,' + image }}
              w="100%"
              h={200}
              br="lg"
              resizeMode={id === 5 ? 'contain' : 'cover'}
            />
          </View>
        )}
        {title && <Text variant="32-semi" text={title} color={id === 4 ? 'white' : 'black'} />}
        {subTitle && (
          <Text mt="sm" text={subTitle} lineHeight={40} variant={id === 1 ? '16-reg' : '24-reg'} color={id === 4 ? 'white' : 'black'} />
        )}
        {text && <Text text={text} variant="14-reg" my="sm" lineHeight={20} color="gray" />}

        <View>
          {id === 4 ? (
            <OutlinedButton onPress={onPress} text={btnTitle} bc={'white'} textColor="white" my="md" px="xl" alignSelf="flex-start" />
          ) : (
            <FilledButton onPress={onPress} text={btnTitle} br="sm" textColor="white" my="md" px="xl" alignSelf="flex-start" />
          )}
        </View>
      </View>
    </View>
  );
};

export { FaqList };
