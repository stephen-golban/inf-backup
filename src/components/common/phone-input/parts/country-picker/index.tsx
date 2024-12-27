import React from 'react';

import { useAppStore } from '@store/app';
import { useTranslation } from '@library/hooks';
import { useWindowDimensions } from 'react-native';

import CountryButton from './country-button';
import { Text } from '@components/common/text';
import { Icon } from '@components/common/icon';
import { BaseButton } from '@components/common/button';
import { CountryPicker as NativeCountryPicker } from 'react-native-country-codes-picker';

import type { PhoneUtil } from '@services/phone-number';
import type { CountryCode } from 'libphonenumber-js/types';
import type { CountryItem, ItemTemplateProps } from 'react-native-country-codes-picker';

interface ICountryPicker {
  util: PhoneUtil;
  disabled?: boolean;
  onSelect: (value: CountryCode, dial_code: string) => void;
}

const CountryPicker: React.FC<ICountryPicker> = ({ onSelect, disabled, util }) => {
  const { t } = useTranslation();
  const { height } = useWindowDimensions();
  const locale = useAppStore(state => state.locale);

  const [modalVisible, setModalVisible] = React.useState(false);

  const handleSelectCountry = (item: CountryItem) => {
    onSelect(item.code as CountryCode, item.dial_code);
    setModalVisible(false);
  };

  const _renderItem = React.useMemo(() => {
    return (item: ItemTemplateProps) => {
      return <CountryButton {...item} />;
    };
  }, []);

  return (
    <>
      <BaseButton maxh={56} direction="row" center disabled={disabled} onPress={() => setModalVisible(true)}>
        <Text variant="14-semi">{`+ ${util.dial_code} ${util.flag}`}</Text>
        <Icon icon="ChevronDown" size={10} color="black" ml="xs" />
      </BaseButton>
      {modalVisible && !disabled && (
        <NativeCountryPicker
          lang={locale}
          show={modalVisible}
          enableModalAvoiding
          pickerButtonOnPress={handleSelectCountry}
          itemTemplate={_renderItem}
          style={{ modal: { height: height / 2 } }}
          popularCountries={['MD', 'RO', 'UA', 'RU']}
          onRequestClose={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          inputPlaceholder={t('ui:placeholders:phone_input_country_search_placeholder')}
        />
      )}
    </>
  );
};

export { CountryPicker };
