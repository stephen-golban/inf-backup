import React from 'react';

import useLoggedInNavigation from './hooks';
import { NativeStackHeaderProps, createNativeStackNavigator } from '@react-navigation/native-stack';

import { Header } from '@components/ui';
import { Tabs } from '@screens/logged-in';
import { Screen } from '@components/common';
import { Screens } from '@screens/logged-in';

import { APP_SCREEN, LOGGED_IN_STACK, type LoggedInStackParams, type RootStackScreenProps } from '@typings/navigation';
import { usePinCodeStore } from '@store/pin-code';

const Stack = createNativeStackNavigator<LoggedInStackParams>();

const renderHeader = (props: NativeStackHeaderProps) => <Header {...props} />;

const LoggedInStack: React.FC<RootStackScreenProps<APP_SCREEN.LOGGED_IN>> = ({ navigation }) => {
  const { loading } = useLoggedInNavigation();
  const isPinScreenVisible = usePinCodeStore(state => state.visible);

  if (isPinScreenVisible) return null;

  return (
    <Screen bg="primary" excludeEdges={['bottom']} loading={loading}>
      <Stack.Navigator initialRouteName={LOGGED_IN_STACK.TABS} screenOptions={{ header: props => renderHeader(props) }}>
        <Stack.Screen name={LOGGED_IN_STACK.TABS} component={Tabs} />
        <Stack.Screen name={LOGGED_IN_STACK.SCREENS} component={Screens} />
      </Stack.Navigator>
    </Screen>
  );
};

export default LoggedInStack;
