import React, { useState, useEffect } from 'react';
import { FilledButton, OutlinedButton, Screen, Text, View } from '@components/common';

import { I18nKey } from '@translations/locales';

interface IReasonModule {
  reasonKeys: string[];
  tellMore(): void;
  onStay(): void;
  proceedToCancel(reason?: string): void;
  handleSelectReason(reason: string): void;
}

const ReasonModule: React.FC<IReasonModule> = props => {
  const { reasonKeys, tellMore, handleSelectReason, proceedToCancel, onStay } = props;
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);

  useEffect(() => {
    setIsContinueEnabled(selectedReason !== null);
  }, [selectedReason]);

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
    handleSelectReason(reason);
  };

  return (
    <Screen pt="zero" scroll unsafe bg="white">
      <Text center t18n="logged_in:feedback:cancellation_reason_prompt" />
      <View my="sm">
        {reasonKeys.map(reasonKey =>
          selectedReason === reasonKey ? (
            <OutlinedButton
              my="sm"
              br="sm"
              textProps={{ variant: '12-mid' }}
              key={reasonKey}
              onPress={() => handleReasonSelect(reasonKey)}
              t18n={`logged_in:feedback:${reasonKey}` as I18nKey}
            />
          ) : (
            <FilledButton
              my="sm"
              br="sm"
              textProps={{ variant: '12-mid' }}
              key={reasonKey}
              onPress={() => handleReasonSelect(reasonKey)}
              t18n={`logged_in:feedback:${reasonKey}` as I18nKey}
            />
          ),
        )}
        <FilledButton mt="sm" textProps={{ variant: '12-mid' }} t18n="logged_in:feedback:tell_us_more" br="sm" onPress={tellMore} />
      </View>
      <OutlinedButton
        mt="xxl"
        br="sm"
        bc="skyBlue"
        onPress={() => proceedToCancel(selectedReason!)}
        t18n="logged_in:feedback:proceed_to_cancel"
        textProps={{ variant: '12-mid', color: 'skyBlue' }}
        disabled={!isContinueEnabled}
      />
      <Text my="md" textDecorationLine="underline" variant="10-reg" center t18n="logged_in:feedback:change_mind" onPress={onStay} />
    </Screen>
  );
};

export { ReasonModule };
