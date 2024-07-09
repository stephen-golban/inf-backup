import React from 'react';
import { useTranslation } from '@library/hooks';
import { ActivityIndicator, Text, View } from '@components/common';

interface IResendBlock {
  loading: boolean;
  seconds: number;
  canResend?: boolean;
  onPressResend(): void;
}

const ResendBlock: React.FC<IResendBlock> = ({ loading, canResend, seconds, onPressResend }) => {
  const { t } = useTranslation();

  return (
    <View row>
      <Text variant="18-bold">
        {canResend && <Text variant="18-bold" t18n="logged_out:otp:code_resend_question" />}
        {/* <Text
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
        </Text> */}
      </Text>
      <View ml="sm">
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text onPress={onPressResend} variant="18-bold" color="blue" t18n="logged_out:otp:code_resend" />
        )}
      </View>
    </View>
  );
};

export { ResendBlock };
