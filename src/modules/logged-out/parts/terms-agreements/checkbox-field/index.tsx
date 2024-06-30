import React from 'react';

import { openBrowserAsync } from '@library/method';

import { Trans } from 'react-i18next';
import { Checkbox, CheckboxProps, Text, View } from '@components/common';

import type { I18nKey } from '@translations/locales';

interface ICheckboxField extends Pick<CheckboxProps, 'value' | 'onToggle'> {
  link: string;
  title: I18nKey;
}

const CheckboxField: React.FC<ICheckboxField> = ({ link, title, ...rest }) => {
  return (
    <Checkbox size={20} checkIconSize={14} {...rest}>
      <Text ml="md" color="black" variant="14-reg" flex>
        <Trans
          i18nKey={title}
          components={{
            1: <Text color="blue" textDecorationLine="underline" variant="14-reg" onPress={() => openBrowserAsync(link)} />,
          }}
        />
      </Text>
    </Checkbox>
  );
};

export { CheckboxField };
