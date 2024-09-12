import React from 'react';

import { Tabs } from '@components/common';
import { ComparisionTab } from './comparision-tab';

import { COMPARISION_PLANS } from './mock';

interface IComparisionTabs {
  selectedPlan: string;
  setSelectedPlan(val: string): void;
}

const ComparisionTabs: React.FC<IComparisionTabs> = ({ selectedPlan, setSelectedPlan }) => {
  const planKeys = Object.keys(COMPARISION_PLANS);

  return (
    <Tabs.Root value={selectedPlan} onValueChange={setSelectedPlan}>
      <Tabs.List>
        <Tabs.Trigger value={planKeys[0]} />
        <Tabs.Trigger value={planKeys[1]} />
        <Tabs.Trigger value={planKeys[2]} />
      </Tabs.List>

      <Tabs.Content value={planKeys[0]}>
        <ComparisionTab
          price={COMPARISION_PLANS.smart.price}
          features={COMPARISION_PLANS.smart.features}
          discount={COMPARISION_PLANS.smart.discount}
          // onSelectPlan={() => handlePlanSelect('smart')}
        />
      </Tabs.Content>
      <Tabs.Content value={planKeys[1]}>
        <ComparisionTab
          features={COMPARISION_PLANS.genius.features}
          price={COMPARISION_PLANS.genius.price}
          discount={COMPARISION_PLANS.genius.discount}
          // onSelectPlan={() => handlePlanSelect('genius')}
        />
      </Tabs.Content>
      <Tabs.Content value={planKeys[2]}>
        <ComparisionTab
          isAnnual
          price={COMPARISION_PLANS.premium.price}
          features={COMPARISION_PLANS.premium.features}
          discount={COMPARISION_PLANS.premium.discount}
          // onSelectPlan={() => handlePlanSelect('premium')}
        />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export { ComparisionTabs };
