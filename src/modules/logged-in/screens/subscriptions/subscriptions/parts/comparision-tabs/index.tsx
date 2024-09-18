import React from 'react';

import { capitalize, isEmpty } from 'lodash';

import { Tabs } from '@components/common';
import { ComparisionTab } from './comparision-tab';

import type { RenderedPlans, SelectedPlan } from '../../type';

interface IComparisionTabs {
  data: RenderedPlans;
  onCancelSubscription(): void;
  setSelectedPlan(val: SelectedPlan): void;
}

const ComparisionTabs: React.FC<IComparisionTabs> = ({ data, setSelectedPlan, onCancelSubscription }) => {
  const keys = Object.keys(data);
  const labels = keys.map(key => capitalize(key.split('_')[0]));

  if (isEmpty(data)) return null;

  const onPressButton = (key: string) => {
    if (data[key].isActive) {
      return onCancelSubscription();
    }
    return setSelectedPlan({
      id: data[key].id,
      price: data[key].price,
      discount: data[key].discount,
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
        <ComparisionTab {...data[keys[0]]} onPressButton={() => onPressButton(keys[0])} />
      </Tabs.Content>
      <Tabs.Content value={labels[1]}>
        <ComparisionTab {...data[keys[1]]} onPressButton={() => onPressButton(keys[1])} />
      </Tabs.Content>
      <Tabs.Content value={labels[2]}>
        <ComparisionTab isAnnual {...data[keys[2]]} onPressButton={() => onPressButton(keys[2])} />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export { ComparisionTabs };
