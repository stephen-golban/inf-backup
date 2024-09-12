import { BaseButton, Checkbox, FilledButton, Switch, Text, View } from '@components/common';
import { Paper } from '@components/ui';
import { useTranslation } from '@library/hooks';
import { useAppStore } from '@store/app';
import { I18nKey } from '@translations/locales';
import { translate } from '@translations/translate';
import React from 'react';

interface ISubscriptionCard {
  plan: string;
  price: number;
  discount: number;
  isPremium: boolean;
  onPressButton?: () => void;
}

const SubscriptionCard: React.FC<ISubscriptionCard> = ({ plan, price, discount = 10, onPressButton, isPremium = false }) => {
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = React.useState(false);
  const [calculatedPrice, setCalculatedPrice] = React.useState(price);

  const subscription = useAppStore(state => state.subscription);

  // console.log(subscription);
  const handleToggle = (checked: boolean) => {
    setIsChecked(checked);
    if (checked) {
      setCalculatedPrice(price - (price * discount) / 100);
    } else {
      setCalculatedPrice(price);
    }
  };

  const planTranslation = (keys: string) => t(`profile:subscriptions:index:${plan}:${keys}` as I18nKey);
  const benefits = translate(`profile:subscriptions:index:${plan}:benefits` as I18nKey, { returnObjects: true }) as unknown as string[];

  return (
    <Paper bg="lightGray" br="xl" shadow="card" py="xl">
      <View rg="sm">
        {discount && (
          <View row justify="flex-end" align="center" cg="md">
            <Switch checked={isChecked} onCheckedChange={handleToggle} sizeW={38} sizeH={20} />
            <View row between align="center" cg="sm">
              <Text
                variant="14-reg"
                text={isPremium ? t('profile:subscriptions:index:pay_annually_with') : t('profile:subscriptions:index:pay_now_with')}
              />
              <Text variant="24-bold" color="sunsetOrange">
                -{discount}%
              </Text>
            </View>
          </View>
        )}
        {price !== calculatedPrice && (
          <FilledButton
            text={
              isPremium
                ? t('profile:subscriptions:index:card:price_y', { price })
                : t('profile:subscriptions:index:card:price_m', { price })
            }
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

      <View mt="md" ml="md">
        <View row align="center" cg="xs">
          <Text variant="14-reg" text={planTranslation('name')} textTransform="uppercase" />
          <Text variant="14-reg" text={t(`profile:subscriptions:index:card:${isChecked ? 'paid_annually' : 'paid_monthly'}`)} />
        </View>
        <Text
          mt="xs"
          variant="32-bold"
          text={t(`profile:subscriptions:index:card:price_${isChecked ? 'y' : 'm'}`, { price: calculatedPrice })}
        />
      </View>
      <View mt="lg" rg="sm">
        {benefits.map((benefit, index) => (
          <Checkbox key={'subscription-card-benefit-' + index} value={true} size={16} checkIconSize={10} br={1}>
            <Text ml="sm" color="black" variant="12-reg" flex text={benefit} />
          </Checkbox>
        ))}
      </View>
      <FilledButton mt="xl" text={planTranslation('button')} onPress={onPressButton} bg="blue" br="md" />
    </Paper>
  );
};

export { SubscriptionCard };
