import React from 'react';

import { format } from 'date-fns';

import { Paper } from '@components/ui';
import { Avatar, BaseButton, Icon, Modal, OutlinedButton, Text, View } from '@components/common';

interface ITrialModal {
  isVisible: boolean;
  onDismiss(): void;
  onPressButton(): void;
  date: string | undefined;
}

const TrialModal: React.FC<ITrialModal> = ({ isVisible, date = new Date(), onPressButton, onDismiss }) => {
  const formattedDate = format(date, 'dd/MM/yyyy');

  return (
    <Modal isVisible={isVisible} backdropColor="black_80" onBackdropPress={onDismiss} onBackButtonPress={onDismiss}>
      <BaseButton fill center onPress={onDismiss}>
        <BaseButton bg="lightBlue" br="md" p="lg" px="xl" shadow="card" onPress={e => e.stopPropagation()}>
          <Icon icon="GiftImageIcon" absolute top={-50} left="60%" style={{ transform: [{ translateX: '-50%' }] }} />
          <Avatar.Base bg="white" br="huge" size={24} absolute top={10} right={10} center onPress={onDismiss}>
            <Icon icon="CloseIcon" size={16} color="gray" />
          </Avatar.Base>

          <Text
            mt="xxl"
            color="blue"
            variant="16-semi"
            textAlign="center"
            t18nOptions={{ date: formattedDate }}
            t18n="subscriptions:trial_modal:bonus_text"
          />
          <OutlinedButton
            mt="lg"
            bc="gray"
            onPress={onPressButton}
            textProps={{ variant: '14-reg', color: 'black' }}
            t18n="subscriptions:trial_modal:subscription_options"
          />
        </BaseButton>
      </BaseButton>
    </Modal>
  );
};

export { TrialModal };
