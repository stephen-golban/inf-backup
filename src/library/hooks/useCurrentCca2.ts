import { useMount } from 'react-use';
import { useCallback, useState } from 'react';
import { setAppCca2, useAppStore } from '@store/app';
import { phoneNumberService } from '@services/phone-number';

import type { CountryCode } from 'libphonenumber-js';

export default function useCurrentCca2() {
  const cca2 = useAppStore(state => state.cca2);
  const [loading, setLoading] = useState(false);

  const getCca2 = useCallback(async () => {
    setLoading(true);
    try {
      const countryCode = await phoneNumberService.getDefaultCountryCode();
      setAppCca2(countryCode as CountryCode);
    } catch (error) {
      console.error('Error getting country code:', error);
      setAppCca2('MD');
    } finally {
      setLoading(false);
    }
  }, []);

  useMount(getCca2);

  return { cca2, loading };
}
