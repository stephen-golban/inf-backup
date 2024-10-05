import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NewCredit } from './new-credit';
import { WhoCheckedCredit } from './who-checked-credit';
import { ScoringDetailsScreen } from './scoring-details';
import { CreditReportSummaryScreen } from './credit-report-summary';
import { SummaryReportStatusScreen } from './summary-report-status';

import {
  LOGGED_IN_SCREENS,
  OWN_DATA_CHECK_SCREENS,
  type LoggedInScreensProps,
  type OwnDataCheckScreensParamList,
} from '@typings/navigation';

const Stack = createNativeStackNavigator<OwnDataCheckScreensParamList>();

const OwnDataCheckStack: React.FC<LoggedInScreensProps<LOGGED_IN_SCREENS.OWN_DATA_CHECK>> = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen component={NewCredit} name={OWN_DATA_CHECK_SCREENS.NewCredit} />
    <Stack.Screen component={WhoCheckedCredit} name={OWN_DATA_CHECK_SCREENS.WhoCheckCredit} />
    <Stack.Screen component={ScoringDetailsScreen} name={OWN_DATA_CHECK_SCREENS.ScoringDetails} />
    <Stack.Screen component={CreditReportSummaryScreen} name={OWN_DATA_CHECK_SCREENS.CreditReportSummary} />
    <Stack.Screen component={SummaryReportStatusScreen} name={OWN_DATA_CHECK_SCREENS.SummaryReportStatus} />
  </Stack.Navigator>
);

export { OwnDataCheckStack };
