import React from 'react';

import { useTheme } from '@theme/index';
import { useAppStore } from '@store/app';

import { SectionItem } from './parts';
import { Screen } from '@components/common';
import SectionInfo from './parts/section-info';

interface ISectionsModule {
  onEdit(): void;
  onLogout(): void;
  onOpenFaq(): void;
  onOpenContacts(): void;
  onOpenSettings(): void;
  onOpenMyAccount(): void;
  onInviteFriends(): void;
  onOpenMyNotitications(): void;
  onOpenMySubscriptions(): void;
}

const SectionsModule: React.FC<ISectionsModule> = props => {
  const { spacing } = useTheme();
  const { user } = useAppStore();
  const {
    onEdit,
    onLogout,
    onOpenFaq,
    onOpenContacts,
    onOpenSettings,
    onOpenMyAccount,
    onInviteFriends,
    onOpenMyNotitications,
    onOpenMySubscriptions,
  } = props;

  return (
    <Screen scroll unsafe style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.md }}>
      <SectionInfo firstName={user?.firstName} lastName={user?.lastName} avatar={user?.photo} onEdit={onEdit} />
      <SectionItem title="profile:sections:my_account" onPressItem={onOpenMyAccount} icon="UserIcon" />
      <SectionItem title="profile:sections:my_subscriptions" onPressItem={onOpenMySubscriptions} icon="SettingsIcon" />
      <SectionItem title="profile:sections:my_notifications" onPressItem={onOpenMyNotitications} icon="NotificationsIcon" />
      <SectionItem title="profile:sections:frequently_asked_questions" onPressItem={onOpenFaq} icon="QuestionIcon" />
      <SectionItem title="profile:sections:invite_your_friends" onPressItem={onInviteFriends} bg="gold" icon="GiftIcon" />
      <SectionItem title="profile:sections:contacts" onPressItem={onOpenContacts} icon="ContactIcon" />
      <SectionItem title="profile:sections:account_settings" onPressItem={onOpenSettings} icon="SettingsIcon" />
      <SectionItem title="profile:sections:log_out" onPressItem={onLogout} icon="LogoutIcon" />
    </Screen>
  );
};

export { SectionsModule };
