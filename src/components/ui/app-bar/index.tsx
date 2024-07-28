import React from 'react';
import { isIos } from '@library/method';
import AppBarButton from './parts/AppBar.Button';
import { InformationModal } from '@modules/modals';
import { BaseButton, Icon, IconType, View } from '@components/common';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LOGGED_IN_SCREENS, LOGGED_IN_STACK, OWN_DATA_CHECK_SCREENS } from '@typings/navigation';

const TAB_ICONS = {
  HOME: 'HomeIcon',
  Plus: 'PlusIcon',
  Like: 'LikeIcon',
};

const HEIGHT_APP_BAR = isIos ? 70 : 60;
const PADDING_BOTTOM_APP_BAR = isIos ? 'md' : 'xs';

const AppBar: React.FC<BottomTabBarProps> = props => {
  const { state, navigation } = props;

  const [toggleInfoModal, setToggleInfoModal] = React.useState<boolean>(false);
  const [toggleRatingModal, setToggleRatingModal] = React.useState<boolean>(false);

  const navigate = (screen: OWN_DATA_CHECK_SCREENS, params?: any) => {
    navigation.navigate(LOGGED_IN_STACK.SCREENS, { screen: LOGGED_IN_SCREENS.OWN_DATA_CHECK, params: { screen } });
  };

  return (
    <View row around bg="blue" align="center" h={HEIGHT_APP_BAR} pb={PADDING_BOTTOM_APP_BAR}>
      {state.routes.map(route => {
        const icon = TAB_ICONS[route.name as keyof typeof TAB_ICONS];

        return <AppBarButton key={route.key} focused={false} icon={icon as IconType} navigation={navigation} name={route.name} />;
      })}

      <BaseButton onPress={() => setToggleInfoModal(true)} center>
        <View w={40} h={40} center bbw={1} bbc="white">
          <Icon icon="PlusIcon" size={22} />
        </View>
      </BaseButton>

      <BaseButton onPress={() => setToggleRatingModal(true)} center>
        <View w={40} h={40} center>
          <Icon icon="LikeIcon" size={22} />
        </View>
      </BaseButton>

      <InformationModal
        isVisible={toggleInfoModal}
        onDismiss={() => setToggleInfoModal(false)}
        onCheckedNavigate={() => {
          setToggleInfoModal(false);
          navigate(OWN_DATA_CHECK_SCREENS.WhoCheckCredit);
        }}
        onFinancialHealthNavigate={() => {
          setToggleInfoModal(false);
          navigate(OWN_DATA_CHECK_SCREENS.NewCredit);
        }}
        onOrderReportNavigate={() => {
          setToggleInfoModal(false);
          navigate(OWN_DATA_CHECK_SCREENS.WhoCheckCredit);
        }}
      />
    </View>
  );
};

export { AppBar };
