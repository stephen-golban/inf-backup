import React from 'react';
import { Alert as RNAlert } from 'react-native';

import { useTranslation } from '@library/hooks';

interface IAlert {
  title: string;
  description: string;
  onCancel?: () => void;
  onContinue?: () => void;
  children?: React.ReactNode;
}

const Alert: React.FC<IAlert> = ({ title, description, onCancel, onContinue, children }) => {
  const { t } = useTranslation();

  const showAlert = () => {
    RNAlert.alert(
      title,
      description,
      [
        {
          text: t('ui:cancel'),
          onPress: onCancel,
        },
        {
          text: t('ui:continue'),
          onPress: onContinue,
          style: 'destructive',
        },
      ],
      { onDismiss: onCancel, cancelable: true },
    );
  };

  return (
    <React.Fragment>
      {React.Children.map(children, child => React.cloneElement(child as React.ReactElement, { onPress: showAlert }))}
    </React.Fragment>
  );
};

export { Alert };
