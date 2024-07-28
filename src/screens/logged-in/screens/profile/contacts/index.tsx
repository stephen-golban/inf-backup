import React from 'react';

import { useContacts } from './hooks';

import { ContactsModule } from '@modules/logged-in';
import { ActivityIndicator } from '@components/common';
import { PROFILE_SCREENS, ProfileStackScreenProps } from '@typings/navigation';

const ContactsScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.CONTACTS>> = () => {
  const { contacts, loading } = useContacts();

  if (loading) {
    return <ActivityIndicator fill justify="center" />;
  }

  return <ContactsModule contacts={contacts!} />;
};

export { ContactsScreen };
