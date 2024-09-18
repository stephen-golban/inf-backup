import React from 'react';

import { useTranslation } from '@library/hooks';

import RowInfo from './Row.Info';
import { FilledButton, Icon, Text, View } from '@components/common';

import type { RenderedPlans } from '../../../type';

type RenderedPlan = RenderedPlans[keyof RenderedPlans];

interface IComparisionTabProps extends RenderedPlan {
  isAnnual?: boolean;
  onPressButton?: () => void;
}

const ComparisionTab: React.FC<IComparisionTabProps> = ({ price, features, discount, isActive, onPressButton, isAnnual = false }) => {
  const { t } = useTranslation();

  return (
    <View bg="white" py="md">
      <View px="md">
        {features.map((feature, index) => (
          <View key={`feature-${index}`} row align="center" h={50}>
            <View row align="center" fill>
              <View center w={15} h={15} bw={1} bc="blue" br="huge">
                <View w={8} h={8} br="huge" bg="blue" />
              </View>

              {/* Text and info icon */}
              <Text ml="sm" flex variant="14-reg" lineHeight={24}>
                {feature.title} {feature.hasInfo && <Icon icon="InfoIcon" color="error" />}
              </Text>
            </View>

            <RowInfo {...feature} discount={discount} isLast={index === features.length - 1} />
          </View>
        ))}
      </View>

      <View mt="md" bg="lightGray" py="lg" center rg="md">
        <Text variant="24-bold" text={t(`subscriptions:index:card:${isAnnual ? 'price_y' : 'price_m'}`, { price })} />
        <FilledButton
          br="md"
          px="xxxl"
          onPress={onPressButton}
          bg={isActive ? 'error' : 'blue'}
          t18n={isActive ? 'subscriptions:index:cancel_button' : 'subscriptions:index:comparison:continue_to_activation'}
        />
      </View>
    </View>
  );
};

export { ComparisionTab };
