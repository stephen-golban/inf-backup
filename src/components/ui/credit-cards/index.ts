// import React from 'react';

import { Card } from './card';
import { CardStack } from '@components/common';
import { CardRegister } from './card-register';
import { TermExtension } from './term-extension';

// import { inRange, isEmpty } from 'lodash';
// import { useToast } from 'react-native-toast-notifications';
// import { useTranslation, useTryCatch } from '@library/hooks';
// import { useRegisterCardService } from '@services/register-card';

// import { CardStack, OutlinedButton, Text, View } from '@components/common';

// import type { GetAllCardsApiResponse } from '@typings/responses';
// import { EmptyState } from '../empty-state';
// import { Card, CardRegister } from './parts';

// interface IPaymentCards {
//   onRefresh: () => Promise<void>;
//   data: GetAllCardsApiResponse | undefined;
//   setCurrentCard?(val: GetAllCardsApiResponse[number]): void;
// }

// const PaymentCards: React.FC<IPaymentCards> = ({ onRefresh, setCurrentCard, data }) => {
//   const toast = useToast();
//   const { t } = useTranslation();
//   const stackRef = React.useRef<any>(null);

//   const { callbackLoading, loadingRegister, onRegisterCard } = useRegisterCardService();

//   const onDeleteCallback = useTryCatch(async (res: number) => {
//     if (inRange(res, 200, 299)) {
//       stackRef.current?.swipe(-1);
//       toast.show(t('ui:toasts:credit_card_deleted'));
//       return await onRefresh();
//     }
//     return;
//   });

//   if (!data || isEmpty(data)) {
//     return <EmptyState title={t('profile:settings:payment_history_screen:no_cards_to_display')} />;
//   }

//   const _renderItem = React.useCallback(
//     (item: GetAllCardsApiResponse[number], isFirst: boolean) => {
//       if (isFirst) {
//         setCurrentCard?.(item as any);
//       }
//       return <Card item={item} isFirst={isFirst} onDeleteCallback={onDeleteCallback} />;
//     },
//     [onDeleteCallback, setCurrentCard],
//   );

//   return (
//     <>
//       <CardStack ref={stackRef} data={data!} renderItem={_renderItem} />
//       <OutlinedButton
//         onPress={() => onRegisterCard(onRefresh)}
//         loading={loadingRegister || callbackLoading}
//         t18n="profile:settings:payment_history_screen:register_new_card"
//       />
//     </>
//   );
// };

const CreditCards = {
  Card,
  TermExtension,
  Stack: CardStack,
  Register: CardRegister,
  // Empty:<EmptyState t18n='profile:settings:payment_history_screen:no_cards_to_display' />
};

export { CreditCards };
