import React from 'react';

import { useTranslation } from '@library/hooks';
import { currencyFormat } from '@library/method';

import { ActivityIndicator, FilledButton, Icon, Image, Screen, Text, View } from '@components/common';
import { DiscountData } from '@typings/responses';

interface IStayModule {
  removing?: boolean;
  purchasing?: boolean;
  screenLoading?: boolean;
  offerPrice: number | undefined;
  retentionOffer?: {
    price: number | undefined;
    months: number | undefined;
    discount: DiscountData | undefined;
  };

  onRemove(): void;
  onActivateOffer(): void;
}

const StayModule: React.FC<IStayModule> = props => {
  const { removing, retentionOffer, offerPrice, purchasing, onRemove, onActivateOffer, screenLoading } = props;
  const { t } = useTranslation();

  const duration = retentionOffer?.months;
  const oldOfferPrice = retentionOffer?.price;
  const discount = retentionOffer?.discount?.discountAmount;

  const noRetentionOffer = !retentionOffer || !retentionOffer?.discount?.discount;

  return (
    <Screen pt="zero" scroll unsafe bg="white" loading={screenLoading}>
      <View w={322} h={174} alignSelf="center">
        <Image br="lg" source={require('@assets/images/stay.png')} />
      </View>
      <View maxw="80%" alignSelf="center" center>
        <Text
          my="md"
          t18n={noRetentionOffer ? 'logged_in:feedback:sorry_to_see_you_go' : 'logged_in:feedback:stay_with_us_offer'}
          center
          variant="14-reg"
        />
        {!noRetentionOffer && (
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
              disabled={noRetentionOffer}
            />
          </>
        )}
        <View row g="sm">
          <Text
            disabled={removing}
            my="md"
            textDecorationLine="underline"
            onPress={onRemove}
            variant="10-reg"
            center
            t18n="logged_in:feedback:proceed_to_cancel"
          />
          {removing && <ActivityIndicator size="small" />}
        </View>
      </View>
    </Screen>
  );
};

export { StayModule };
