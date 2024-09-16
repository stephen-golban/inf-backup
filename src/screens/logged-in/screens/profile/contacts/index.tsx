import React from 'react';

import { useContacts } from './hooks';

import { Loader } from '@components/ui';
import { ContactsModule } from '@modules/logged-in';
import { PROFILE_SCREENS, ProfileStackScreenProps } from '@typings/navigation';

const ContactsScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.CONTACTS>> = () => {
  const { contacts, loading } = useContacts();

  if (loading) {
    return <Loader fill justify="center" />;
  }

  return <ContactsModule contacts={contacts!} />;
};

export { ContactsScreen };
