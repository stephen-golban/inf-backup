import { useState } from 'react';
import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';

import { IContactsResponse } from '@typings/responses/contacts';

const useContacts = () => {
  const [contacts, setContacts] = useState<IContactsResponse | null>(null);
  const [call, { loading }] = useLazyAxios<IContactsResponse | null>('/admin-api/companies/owner');

  const getContacts = async () => await call(undefined, res => setContacts(res));

  useMount(getContacts);
  return {
    loading,
    contacts,
  };
};

export { useContacts };
