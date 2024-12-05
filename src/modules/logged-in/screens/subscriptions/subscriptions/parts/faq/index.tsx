import React from 'react';

import { translate } from '@translations/translate';

import { Accordion, Text, View } from '@components/common';

import type { I18nKey } from '@translations/locales';

const Faq = () => {
  const list = translate('subscriptions:index:faq:questions' as I18nKey, { returnObjects: true }) as unknown as {
    q: string;
    a: string;
  }[];

  return (
    <View>
      <Text variant="24-bold" t18n="subscriptions:index:faq:title" color="blue" />
      <Accordion.Root defaultValue={[]} type="multiple" style={{ borderTopWidth: 1, borderTopColor: '#e5e5e5', marginTop: 30 }}>
        {list.map(item => (
          <Accordion.Item key={item.q} value={item.q}>
            <Accordion.Trigger>
              <Text style={{ maxWidth: '90%' }} variant="14-reg" color="blue" text={item.q} />
            </Accordion.Trigger>
            <Accordion.Content>
              <Text variant="14-reg" color="gray_41" text={item.a} lineHeight={18} />
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </View>
  );
};

export { Faq };
