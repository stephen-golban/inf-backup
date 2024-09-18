import React from 'react';

import { useTranslation } from '@library/hooks';
import { translate } from '@translations/translate';

import { Paper } from '@components/ui';
import { Checkbox, FilledButton, Switch, Text, View } from '@components/common';

import type { I18nKey } from '@translations/locales';
import type { RenderedSubscription, SelectedPlan } from '../../type';

interface ISubscriptionCard extends RenderedSubscription {
  onPressCancel?: () => void;
  onSelectPlan: (val: SelectedPlan) => void;
  setSubscriptions: React.Dispatch<React.SetStateAction<RenderedSubscription[] | null>>;
}

const SubscriptionCard: React.FC<ISubscriptionCard> = ({
  id,
  plan,
  price,
  isActive,
  discount = 0,
  onSelectPlan,
  onPressCancel,
  setSubscriptions,
  isPremium = false,
}) => {
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = React.useState(false);
  const [calculatedPrice, setCalculatedPrice] = React.useState(price);

  const calculateAnnual = (val: number) => val * 12;

  const handleToggle = (checked: boolean) => {
    setIsChecked(checked);
    if (checked) {
      const formula = price - (price * discount) / 100;
      const newPrice = Math.ceil(isPremium ? formula : calculateAnnual(formula));
      updatePrice(newPrice);
      setCalculatedPrice(newPrice);
    } else {
      setCalculatedPrice(price);
    }
  };

  const updatePrice = (newPrice = calculatedPrice) => {
    setSubscriptions(prev => {
      const updatedPlans = (prev || []).map(item => {
        if (item.id === id) {
          return { ...item, calculatedPrice: newPrice };
        }
        return item;
      });
      return updatedPlans;
    });
  };

  const handleOnSelectPlan = () => {
    onSelectPlan({ id, price: calculatedPrice, discount });
  };

  const planTranslation = (keys: string) => t(`subscriptions:index:${plan}:${keys}` as I18nKey);
  const benefits = translate(`subscriptions:index:${plan}:benefits` as I18nKey, { returnObjects: true }) as unknown as string[];

  return (
    <Paper bg="lightGray" br="xl" shadow="card" py="xl" bw={1} bc={isActive ? 'blue' : 'transparent'}>
      {discount && (
        <View rg="sm">
          <View row justify="flex-end" align="center" cg="md">
            <Switch checked={isChecked} onCheckedChange={handleToggle} sizeW={38} sizeH={20} />
            <View row between align="center" cg="sm">
              <Text
                variant="14-reg"
                text={isPremium ? t('subscriptions:index:pay_now_with') : t('subscriptions:index:pay_annually_with')}
              />
              <Text variant="24-bold" color="sunsetOrange">
                -{discount}%
              </Text>
            </View>
          </View>
          {price !== calculatedPrice && (
            <FilledButton
              text={t('subscriptions:index:card:price_y', { price: isPremium ? price : calculateAnnual(price) })}
              bg="goldenYellow"
              bc="lightGray"
              shadow="card"
              w={150}
              h={35}
              alignSelf="flex-end"
              textColor="black"
              textProps={{ textDecorationLine: 'line-through', textDecorationColor: 'crimsonRed', textDecorationStyle: 'solid' }}
            />
          )}
        </View>
      )}

      <View mt="md" ml="md">
        <View row align="center" cg="xs">
          <Text variant="14-reg" text={planTranslation('name')} textTransform="uppercase" />
          <Text
            variant="14-reg"
            text={t(`subscriptions:index:card:${isPremium ? 'paid_annually' : isChecked ? 'paid_annually' : 'paid_monthly'}`)}
          />
        </View>
        <Text
          mt="xs"
          variant="32-bold"
          text={t(`subscriptions:index:card:price_${isPremium ? 'y' : isChecked ? 'y' : 'm'}`, {
            price: calculatedPrice,
          })}
        />
      </View>
      <View mt="lg" rg="sm">
        {benefits.map((benefit, index) => (
          <Checkbox key={'subscription-card-benefit-' + index} value={true} size={16} checkIconSize={10} br={1}>
            <Text ml="sm" color="black" variant="12-reg" flex text={benefit} />
          </Checkbox>
        ))}
      </View>
      <FilledButton
        mt="xl"
        br="md"
        bg={isActive ? 'error' : 'blue'}
        onPress={isActive ? onPressCancel : handleOnSelectPlan}
        text={isActive ? t('subscriptions:index:cancel_button') : planTranslation('button')}
      />
    </Paper>
  );
};

export { SubscriptionCard };
