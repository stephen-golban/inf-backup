import React from 'react';

import { format } from 'date-fns';
import { useGoBack } from '@library/hooks';
import { formatDateTimeWithDateFns } from '@library/method';

import { DownloadReportModule } from '@modules/logged-in';

import { LOGGED_IN_STACK, LOGGED_IN_TABS, OWN_DATA_CHECK_SCREENS, type OwnDataCheckScreenProps } from '@typings/navigation';

const DownloadReport: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.DownloadReport>> = ({ navigation, route }) => {
  const reportId = route.params.id;
  const generationDateTime = route.params.generationDateTime;

  const formattedGenerationDateTime = React.useMemo(() => {
    if (typeof generationDateTime === 'string') {
      return format(new Date(generationDateTime), 'MM/dd/yyyy');
    }
    return formatDateTimeWithDateFns(generationDateTime, 'MM/dd/yyyy');
  }, [generationDateTime]);

  const onPressNotNow = () => navigation.navigate(LOGGED_IN_STACK.TABS, { screen: LOGGED_IN_TABS.HOME });

  useGoBack(true, navigation.goBack);

  return <DownloadReportModule reportId={reportId} onPressNotNow={onPressNotNow} generationDateTime={formattedGenerationDateTime} />;
};

export { DownloadReport };
