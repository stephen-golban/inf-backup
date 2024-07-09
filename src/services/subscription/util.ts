import { isEmpty } from 'lodash';

import type { PurchasedSubscriptionsResponse } from '@typings/responses';

type AbonamentList = PurchasedSubscriptionsResponse['_embedded']['entityModelList'];
type AbonamentEntity = PurchasedSubscriptionsResponse['_embedded']['entityModelList'][number];

export const getMaxTermDateTimeEntity = (abonamentList: AbonamentList): AbonamentEntity | undefined => {
  if (!isEmpty(abonamentList)) {
    return abonamentList?.reduce((max, current) => {
      const maxDate = new Date(max.subscriptionAccounts[0].termDateTime);
      const currentDate = new Date(current.subscriptionAccounts[0].termDateTime);

      return currentDate > maxDate ? current : max;
    });
  }
};
