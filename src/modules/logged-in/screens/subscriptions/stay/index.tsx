import React from 'react';

import { useAppStore } from '@store/app';
import { useTranslation } from '@library/hooks';
import { currencyFormat } from '@library/method';

import { BaseButton, FilledButton, Icon, Image, Screen, Text, View } from '@components/common';

interface IStayModule {
  removing?: boolean;
  purchasing?: boolean;
  hasRetentionOffer: boolean;
  offerPrice: number | undefined;

  onRemove(): void;
  onActivateOffer(): void;
}

const StayModule: React.FC<IStayModule> = props => {
  const { removing, hasRetentionOffer, offerPrice, purchasing, onRemove, onActivateOffer } = props;
  const { t } = useTranslation();
  const subscription = useAppStore(state => state.subscription);

  const oldOfferPrice = subscription?.price;
  const duration = subscription?.retentionOfferMonths;
  const discount = subscription?.retentionOfferDiscount?.discountAmount;

  return (
    <Screen pt="zero" scroll unsafe bg="white">
      <View w={322} h={174} alignSelf="center">
        <Image br="lg" source={require('@assets/images/stay.png')} />
      </View>
      <View maxw="80%" alignSelf="center" center>
        <Text
          my="md"
          t18n={`logged_in:feedback:${hasRetentionOffer ? 'stay_with_us_offer' : 'sorry_to_see_you_go'}`}
          center
          variant="14-reg"
        />
        {hasRetentionOffer ? (
          <>
            <Icon icon="GiftIcon" color="blue" size={40} my="md" />
            {oldOfferPrice !== undefined && (
              <Text color="crimsonRed" textDecorationLine="line-through" textDecorationColor="black">
                {currencyFormat(oldOfferPrice)}/{t('profile:my_account:subscription_duration:month_1').toLowerCase()}
              </Text>
            )}
            {offerPrice && (
              <Text variant="18-mid" my="lg">
                {currencyFormat(offerPrice)}/{t('profile:my_account:subscription_duration:month_1').toLowerCase()}
              </Text>
            )}
            <Text t18n="logged_in:feedback:discount_offer" center variant="12-reg" t18nOptions={{ discount, duration }} />
            <FilledButton
              h={40}
              mt="xxl"
              br="sm"
              px="xxl"
              bg="skyBlue"
              loading={purchasing}
              onPress={onActivateOffer}
              textProps={{ variant: '12-reg' }}
              t18n="logged_in:feedback:activate_offer"
            />
            <BaseButton row g="sm" loading={removing}>
              <Text
                my="md"
                center
                variant="10-reg"
                onPress={onRemove}
                textDecorationLine="underline"
                t18n="logged_in:feedback:proceed_to_cancel"
              />
            </BaseButton>
          </>
        ) : (
          <FilledButton
            h={40}
            mt="xxl"
            br="sm"
            bg="error"
            minw={150}
            loading={removing}
            onPress={onRemove}
            textProps={{ variant: '12-reg' }}
            t18n="logged_in:feedback:proceed_to_cancel"
          />
        )}
      </View>
    </Screen>
  );
};

export { StayModule };
