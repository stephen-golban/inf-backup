import React from 'react';

import { FaqList } from './parts';

import { Loader } from '@components/ui';
import { ScrollView } from '@components/common';

import { IFaqResponse } from '@typings/responses';
import { openBrowserAsync } from '@library/method';

interface IFaqModule {
  loading: boolean;
  faq: IFaqResponse | null;
}

const FaqModule: React.FC<IFaqModule> = ({ faq, loading }) => {
  if (loading) {
    return <Loader center />;
  }

  const faqItems = faq?._embedded.entityModelList[0];

  const backgroundColors = ['lightBlue', 'white', 'white', 'blue', 'white'];

  const enhancedItems = faqItems?.items
    ?.sort((a, b) => a.id - b.id)
    .map((item, index) => ({
      ...item,
      styles: {
        background: backgroundColors[index],
        id: index,
      },
    }));

  return (
    <ScrollView>
      {faqItems && (
        <>
          {enhancedItems?.map(item => (
            <FaqList
              id={item.id}
              key={item.id}
              text={item.text!}
              image={item.image}
              title={item.title}
              subTitle={item.subtitle}
              viewOptions={item.styles}
              btnTitle={item.buttonTitle}
              onPress={() => openBrowserAsync(item.buttonUrl)}
            />
          ))}
        </>
      )}
    </ScrollView>
  );
};

export { FaqModule };
