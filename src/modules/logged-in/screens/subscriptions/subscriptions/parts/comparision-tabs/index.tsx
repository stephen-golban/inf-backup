import React from 'react';

import { capitalize, isEmpty } from 'lodash';

import { Tabs } from '@components/common';
import { ComparisionTab } from './comparision-tab';

import type { RenderedPlans, SelectedPlan } from '../../type';

interface IComparisionTabs {
  data: RenderedPlans;
  onCancelSubscription(): void;
  setSelectedPlan(val: SelectedPlan): void;
  purchaseLoading?: (id: number) => boolean;
}

const ComparisionTabs: React.FC<IComparisionTabs> = ({ data, purchaseLoading, setSelectedPlan, onCancelSubscription }) => {
  const keys = Object.keys(data);
  const labels = keys.map(key => capitalize(key.split('_')[0]));

  if (isEmpty(data)) return null;

  const onPressButton = (key: string) => {
    if (data[key].isActive) {
      return onCancelSubscription();
    }
    return setSelectedPlan({
      id: data[key].id,
      name: key,
      price: data[key].price,
      discount: data[key].discount,
      isAnnual: data[key].isAnnual,
    });
  };

  return (
    <Tabs.Root defaultValue={labels[0]}>
      <Tabs.List>
        <Tabs.Trigger value={labels[0]} />
        <Tabs.Trigger value={labels[1]} />
        <Tabs.Trigger value={labels[2]} />
      </Tabs.List>

      <Tabs.Content value={labels[0]}>
        <ComparisionTab {...data[keys[0]]} onPressButton={() => onPressButton(keys[0])} loading={purchaseLoading?.(data[keys[0]].id)} />
      </Tabs.Content>
      <Tabs.Content value={labels[1]}>
        <ComparisionTab {...data[keys[1]]} onPressButton={() => onPressButton(keys[1])} loading={purchaseLoading?.(data[keys[1]].id)} />
      </Tabs.Content>
      <Tabs.Content value={labels[2]}>
        <ComparisionTab
          {...data[keys[2]]}
          isAnnual
          onPressButton={() => onPressButton(keys[2])}
          loading={purchaseLoading?.(data[keys[2]].id)}
        />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export { ComparisionTabs };
