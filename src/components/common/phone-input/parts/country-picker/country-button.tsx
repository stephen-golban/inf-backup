import React from 'react';

import { getCountryCallingCode } from 'libphonenumber-js';

import { Text } from '@components/common/text';
import { BaseButton } from '@components/common/button';

import type { CountryCode } from 'libphonenumber-js';
import type { ItemTemplateProps } from 'react-native-country-codes-picker';

interface ICountryButton extends ItemTemplateProps {}

const unknownCodes = ['AQ', 'AN', 'GS'];

const CountryButton: React.FC<ICountryButton> = ({ item, name, style, ...rest }) => {
  const dial_code = React.useMemo(() => {
    if (item?.code) {
      if (unknownCodes.includes(item.code)) {
        return item.dial_code;
      }
      return `+${getCountryCallingCode(item.code as CountryCode)}`;
    }
    return item.dial_code;
  }, [item?.code]);

  return (
    <BaseButton py={10} bg="gray_f5" w="100%" minh={50} maxh={62} px={25} align="center" row my={2} br={10} {...rest}>
      <Text style={[{ flex: 0.2 }]}>{item?.flag}</Text>
      <Text style={[{ flex: 0.3 }]}>{dial_code}</Text>
      <Text style={[{ flex: 1 }]}>{name}</Text>
    </BaseButton>
  );
};

export default CountryButton;
