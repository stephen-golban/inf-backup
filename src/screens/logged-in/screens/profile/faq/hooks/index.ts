import { useState } from 'react';
import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';

import { IFaqResponse } from '@typings/responses';

const useFaq = () => {
  const [faq, setFaq] = useState<IFaqResponse | null>(null);
  const [call, { loading }] = useLazyAxios<IFaqResponse | null>('/admin-api/faq');

  const getFaq = async () => await call(undefined, res => setFaq(res));

  useMount(getFaq);
  return {
    faq,
    loading,
  };
};

export { useFaq };
