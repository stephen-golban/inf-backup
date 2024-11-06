import React from 'react';

import { format } from 'date-fns';
import { useAxios } from '@api/hooks';
import { useGoBack } from '@library/hooks';

import { DownloadReportModule } from '@modules/logged-in';

import { LOGGED_IN_STACK, LOGGED_IN_TABS, OWN_DATA_CHECK_SCREENS, type OwnDataCheckScreenProps } from '@typings/navigation';

const DownloadReport: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.DownloadReport>> = ({ navigation, route }) => {
  const reportId = route.params?.id;

  const { data, loading } = useAxios<string>(`/credit-report/${reportId}/files/JSON`);
  const jsonData = data ? JSON.parse(atob(data)) : null;

  const generationDateTime = jsonData?.responseDateTime as string;

  const formattedGenerationDateTime = React.useMemo(() => {
    if (!generationDateTime) return '';
    const parsedDate = new Date(generationDateTime.replace(' ', 'T'));
    return format(parsedDate, 'MM/dd/yyyy');
  }, [generationDateTime]);

  const onPressNotNow = () => navigation.navigate(LOGGED_IN_STACK.TABS, { screen: LOGGED_IN_TABS.HOME });

  useGoBack(true, navigation.goBack);

  return (
    <DownloadReportModule
      reportId={reportId}
      loading={loading}
      onPressNotNow={onPressNotNow}
      generationDateTime={formattedGenerationDateTime}
    />
  );
};

export { DownloadReport };
