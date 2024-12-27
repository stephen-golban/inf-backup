import { useState } from 'react';
import { useMount } from 'react-use';
import { setAppCca2, useAppStore } from '@store/app';
import { phoneNumberService } from '@services/phone-number';

import type { CountryCode } from 'libphonenumber-js';

export default function useCurrentCca2() {
  const [loading, setLoading] = useState(true);

  const cca2 = useAppStore(state => state.cca2);
  const retrieveCountryCode = async () => {
    try {
      const countryCode = await phoneNumberService.getDefaultCountryCode();
      setAppCca2(countryCode as CountryCode);
    } catch (error) {
      console.error('Error fetching geo data:', error);
    } finally {
      setLoading(false);
    }
  };

  useMount(retrieveCountryCode);

  return { cca2, loading };
}
