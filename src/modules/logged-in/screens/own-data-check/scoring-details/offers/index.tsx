import React from 'react';
import { FilledButton, OutlinedButton, Text, View } from '@components/common';
import { PurchasedSubscription } from '@typings/responses';

interface IScoringDetailsOffersProps {
  buttonText: string;
  subscription: PurchasedSubscription | undefined;
  discountText?: string;
  costText?: string;
  isLoading: boolean;
  onNavigate(): void;
}

const ScoringDetailsOffers: React.FC<IScoringDetailsOffersProps> = ({ buttonText, discountText, costText, isLoading, onNavigate }) => {
  const type = 1;
  const Button = type ? FilledButton : OutlinedButton;

  return (
    <View>
      <Text center my="md" color="darkGray" variant="14-mid">
        {costText}
      </Text>

      <Button bc={type ? 'blue' : 'gray'} br="md" onPress={onNavigate} loading={isLoading}>
        <Text color={type ? 'white' : 'gray'} variant="16-semi">
          {buttonText}
        </Text>
      </Button>

      {discountText && (
        <Text center color="gray" variant="12-reg">
          {discountText}
        </Text>
      )}

      {discountText && (
        <Text mt="sm" color="crimsonRed" variant="12-reg" center>
          {discountText}
        </Text>
      )}
    </View>
  );
};

export { ScoringDetailsOffers };
