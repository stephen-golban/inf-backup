import React from 'react';

import { Linking } from 'react-native';

import { useAppStore } from '@store/app';
import { phoneNumberService } from '@services/phone-number';

import { Divider } from '@components/ui/divider';
import { BaseButton, Icon, Screen, Text, View } from '@components/common';

import type { IContactsResponse } from '@typings/responses/contacts';

interface IContactsModule {
  contacts?: IContactsResponse;
}

const ContactsModule: React.FC<IContactsModule> = ({ contacts }) => {
  const cca2 = useAppStore(state => state.cca2!);
  const { fullPattern } = phoneNumberService.createPhoneUtil(cca2);

  return (
    <View bg="white" fill>
      <Screen p="md" scroll unsafe>
        <View row between>
          <Text t18n="profile:contacts:call_center" color="blue" variant="16-reg" />
          <Icon icon="PhoneIcon" />
        </View>
        <Divider isHorizontal mt="sm" mb="md" />
        {contacts?.contactData.phones.map(phone => (
          <Text my="sm" variant="14-reg" key={'contacts-phone-number' + phone}>
            {phoneNumberService.fullPhoneNumberFormatter(fullPattern, phone)}
          </Text>
        ))}
        <Divider isHorizontal mt="sm" mb="lg" />

        <View row between>
          <Text t18n="profile:contacts:email_address" color="blue" variant="16-reg" />
          <Icon icon="MailIcon" />
        </View>
        <Divider isHorizontal mt="sm" mb="md" />
        {contacts?.contactData.emails.map(email => (
          <BaseButton key={'contacts-email' + email} onPress={() => Linking.openURL(`mailto:${email}`)}>
            <Text my="sm" variant="14-reg" textDecorationLine="underline">
              {email}
            </Text>
          </BaseButton>
        ))}
        <Divider isHorizontal mt="sm" mb="lg" />

        <View row between>
          <Text t18n="profile:contacts:web_page" color="blue" variant="16-reg" />
          <Icon icon="WebIcon" />
        </View>
        <Divider isHorizontal mt="sm" mb="md" />
        {contacts?.contactData.webSites.map(webPage => (
          <Text key={'contacts-webpage' + webPage} my="sm" variant="14-reg" textDecorationLine="underline">
            {webPage}
          </Text>
        ))}
        <Divider isHorizontal mt="sm" mb="lg" />

        <View row between>
          <Text t18n="profile:contacts:office_address" color="blue" variant="16-reg" />
          <Icon icon="BuildingIcon" />
        </View>
        <Divider isHorizontal mt="sm" mb="md" />
        <Text>{`${contacts?.address.street} ${contacts?.address.number}, ${contacts?.address.locality}`}</Text>
        <Divider isHorizontal mt="md" mb="lg" />
      </Screen>
    </View>
  );
};

export { ContactsModule };
