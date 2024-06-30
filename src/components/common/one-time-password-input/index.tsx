import React from 'react';

import { isEmpty } from 'lodash';
import { useErrorMessageTranslation } from '@library/hooks';

import { Text } from '../text';
import { BaseButton } from '../button';
import { HelperText } from '@components/ui';
import { CodeField, CodeFieldProps, Cursor } from 'react-native-confirmation-code-field';

interface IOneTimePasswordInputProps extends Pick<CodeFieldProps, 'value' | 'cellCount' | 'onBlur'> {
  error?: string;
  onBlur: () => void;
  onChange: (value: string) => void;
}

const OneTimePasswordInput: React.FC<IOneTimePasswordInputProps> = props => {
  const { value = '', error = '', cellCount = 6, onBlur, onChange } = props;

  const message = useErrorMessageTranslation(error);
  const formatValue = (val: string) => val.replace(/[^0-9]/g, '');

  const getColor = (isFocused: boolean) => (error ? 'error' : isFocused ? 'blue_7' : 'lightBlue');

  return (
    <>
      <CodeField
        autoFocus
        onBlur={onBlur}
        cellCount={cellCount}
        keyboardType="number-pad"
        value={formatValue(value)}
        rootStyle={{ width: '100%' }}
        textContentType="oneTimeCode"
        onChangeText={txt => onChange(formatValue(txt))}
        renderCell={({ index, symbol, isFocused }) => {
          return (
            <BaseButton w={48} h={64} bw={1} center br={8} key={'phone-number-' + index} bg={getColor(isFocused)} bc={getColor(isFocused)}>
              <Text variant="24-bold">{symbol || (isFocused ? <Cursor delay={500} /> : null)}</Text>
            </BaseButton>
          );
        }}
      />
      <HelperText visible={!isEmpty(message)} msg={message || ''} type={'error'} />
    </>
  );
};

export { OneTimePasswordInput };
