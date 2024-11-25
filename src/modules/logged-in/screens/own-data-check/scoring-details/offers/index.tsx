import React from 'react';
import { Trans } from 'react-i18next';
import { FilledButton, OutlinedButton, Text, View } from '@components/common';

import { PurchasedSubscription } from '@typings/responses';

interface IScoringDetailsOffersProps {
  costText?: string;
  disabled: boolean;
  isLoading: boolean;
  buttonText: string;
  onNavigate(): void;
  discountText?: string;
  secondaryText?: string;
  lowerButtonText?: string;
  subscription: PurchasedSubscription | undefined;
}

const ScoringDetailsOffers: React.FC<IScoringDetailsOffersProps> = ({
  disabled,
  costText,
  isLoading,
  buttonText,
  discountText,
  secondaryText,
  onNavigate,
}) => {
  const Button = !disabled ? FilledButton : OutlinedButton;
  return (
    <View>
      <Text center my="md" color="darkGray" variant="14-mid">
        {costText}
      </Text>

      <Button disabled={disabled} bc={!disabled ? 'blue' : 'gray'} br="md" onPress={onNavigate} loading={isLoading}>
        <Text color={!disabled ? 'white' : 'gray'} variant="14-semi" center>
          {buttonText}
        </Text>
      </Button>

      {discountText && (
        <Text variant="10-reg" textAlign="center" mt="sm">
          <Trans i18nKey={discountText} components={{ 2: <Text variant="10-reg" color="crimsonRed" /> }} />
        </Text>
      )}

      {/* {secondaryText && (
        <Text variant="10-reg" textAlign="center" mt="sm">
          <Trans i18nKey={secondaryText} components={{ 2: <Text variant="10-reg" color="crimsonRed" /> }} />
        </Text>
      )} */}
    </View>
  );
};

export { ScoringDetailsOffers };
