import React from 'react';

import { useTranslation } from '@library/hooks';

import { ActivityIndicator, Text } from '@components/common';

interface IResendBlock {
  seconds: number;
  canResend?: boolean;
  onPressResend(): void;
}

const ResendBlock: React.FC<IResendBlock> = ({ canResend, seconds, onPressResend }) => {
  const { t } = useTranslation();
  return (
    <Text flex variant="18-bold">
      {canResend ? <Text variant="18-bold" t18n="logged_out:otp:code_resend_question" /> : <ActivityIndicator color="blue" />}{' '}
      <Text
        flex
        ml="sm"
        variant="18-bold"
        disabled={!canResend}
        color={canResend ? 'blue' : 'black'}
        onPress={canResend ? onPressResend : undefined}>
        {canResend ? (
          t('logged_out:otp:code_resend')
        ) : (
          <Text variant="18-bold">
            {t('logged_out:otp:code_valid')}{' '}
            <Text variant="18-bold" color="blue">
              {seconds}
            </Text>{' '}
            {t('logged_out:otp:code_sec')}
          </Text>
        )}
      </Text>
    </Text>
  );
};

export { ResendBlock };
