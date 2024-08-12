import React from 'react';
import { useTranslation } from '@library/hooks';

import { ActivityIndicator, FilledButton, Icon, Image, Screen, Text, View } from '@components/common';

import { currencyFormat } from '@library/method';

interface IStayModule {
  loading?: boolean;
  offerPrice: number;
  oldOfferPrice?: number;

  onRemove(): void;
  onActivateOffer(): void;
}

const StayModule: React.FC<IStayModule> = props => {
  const { loading, offerPrice, oldOfferPrice, onRemove, onActivateOffer } = props;
  const { t } = useTranslation();
  return (
    <Screen pt="zero" scroll unsafe bg="white">
      <View w={322} h={174} alignSelf="center">
        <Image br="lg" source={require('@assets/images/stay.png')} />
      </View>
      <View maxw="80%" alignSelf="center" center>
        <Text my="md" t18n="logged_in:feedback:stay_with_us_offer" center variant="14-reg" />
        <Icon icon="GiftIcon" color="blue" size={40} my="md" />
        {oldOfferPrice && (
          <Text color="crimsonRed" textDecorationLine="line-through" textDecorationColor="black">
            {currencyFormat(oldOfferPrice)}/{t('profile:my_account:subscription_duration:month_1').toLowerCase()}
          </Text>
        )}
        <Text variant="18-mid" my="lg">
          {currencyFormat(offerPrice)}/{t('profile:my_account:subscription_duration:month_1').toLowerCase()}
        </Text>
        <Text t18n="logged_in:feedback:discount_offer" center variant="12-reg" />
        <FilledButton
          h={40}
          mt="xxl"
          disabled={loading}
          br="sm"
          px="xxl"
          bg="skyBlue"
          onPress={onActivateOffer}
          textProps={{ variant: '12-reg' }}
          t18n="logged_in:feedback:activate_offer"
        />
        <View row g="sm">
          <Text
            disabled={loading}
            my="md"
            textDecorationLine="underline"
            onPress={onRemove}
            variant="10-reg"
            center
            t18n="logged_in:feedback:proceed_to_cancel"
          />
          {loading && <ActivityIndicator size="small" />}
        </View>
      </View>
    </Screen>
  );
};

export { StayModule };
