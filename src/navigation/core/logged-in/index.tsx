import React from 'react';

import { useGetSubscription } from '@services/subscription';
import { NativeStackHeaderProps, createNativeStackNavigator } from '@react-navigation/native-stack';

import { Header } from '@components/ui';
import { Tabs } from '@screens/logged-in';
import { Screen } from '@components/common';
import { Screens } from '@screens/logged-in';

import { APP_SCREEN, LOGGED_IN_STACK, type LoggedInStackParams, type RootStackScreenProps } from '@typings/navigation';
import { useGetNomenclatures } from '@services/nomenclatures';

const Stack = createNativeStackNavigator<LoggedInStackParams>();

const renderHeader = (props: NativeStackHeaderProps) => <Header {...props} />;

const LoggedInStack: React.FC<RootStackScreenProps<APP_SCREEN.LOGGED_IN>> = () => {
  const { loading: loadingSubscription } = useGetSubscription(true);

  const { loading: loadingNomenclatures } = useGetNomenclatures('STAGES');

  return (
    <Screen bg="primary" excludeEdges={['bottom']} loading={loadingSubscription || loadingNomenclatures}>
      <Stack.Navigator initialRouteName={LOGGED_IN_STACK.TABS} screenOptions={{ header: props => renderHeader(props) }}>
        <Stack.Screen name={LOGGED_IN_STACK.TABS} component={Tabs} />
        <Stack.Screen name={LOGGED_IN_STACK.SCREENS} component={Screens} />
      </Stack.Navigator>
    </Screen>
  );
};

export default LoggedInStack;
