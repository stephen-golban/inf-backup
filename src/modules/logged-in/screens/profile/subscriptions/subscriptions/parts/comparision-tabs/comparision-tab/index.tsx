import { Avatar, BaseButton, FilledButton, Icon, Text, View } from '@components/common';
import { Paper } from '@components/ui';
import { useTranslation } from '@library/hooks';
import { translate } from '@translations/translate';
import React from 'react';
import RowInfo from './Row.Info';

interface IComparisionTabProps {
  price: number;
  discount: number;
  isAnnual?: boolean;
  onSelectPlan?: () => void;
  features: { title: string; disabled: boolean; hasInfo: boolean; tag?: string }[];
}

const ComparisionTab: React.FC<IComparisionTabProps> = ({ isAnnual = false, features, price, discount, onSelectPlan }) => {
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
        <Text variant="24-bold" text={t(`profile:subscriptions:index:card:${isAnnual ? 'price_y' : 'price_m'}`, { price })} />
        <FilledButton onPress={onSelectPlan} t18n="profile:subscriptions:index:comparison:continue_to_activation" br="md" px="xxxl" />
      </View>
    </View>
  );
};

export { ComparisionTab };
