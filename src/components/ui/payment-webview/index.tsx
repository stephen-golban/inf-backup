import React from 'react';
import { Modal } from 'react-native';
import { BaseButton, Screen, Text, View } from '@components/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Divider } from '../divider';
import { truncate } from 'lodash';
import FunnelCards from './cards';
import FunnelWebview from './webview';

interface PaymentWebViewProps {
  url: string;
  visible: boolean;
  onDismiss: () => void;
  billerId: string | null;
  setBillerId(arg: string | null): void;
  onPaymentSuccess(payId: string, orderId: string): void;
}

const PaymentWebView: React.FC<PaymentWebViewProps> = ({ url, visible, billerId, onPaymentSuccess, setBillerId, onDismiss }) => {
  const insets = useSafeAreaInsets();
  const [step, setStep] = React.useState(1);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onDismiss}>
      <Screen bg="white" fill pt={insets.top} pb={insets.bottom}>
        <View row between align="center" px="sm">
          <BaseButton onPress={onDismiss} t18n="ui:cancel" textProps={{ variant: '16-semi', color: 'skyBlue' }} />
          <Text variant="14-semi" text={truncate(url.split('://')[1], { length: 20, omission: '...' })} />
          <View style={{ width: 50 }} />
        </View>
        <Divider isHorizontal bg="softGray" mt="sm" h={2} />
        {step === 1 && <FunnelCards selected={billerId} onSelect={setBillerId} onPressContinue={() => setStep(2)} />}
        {step === 2 && billerId && <FunnelWebview onDismiss={onDismiss} onPaymentSuccess={onPaymentSuccess} url={url} />}
      </Screen>
    </Modal>
  );
};

export { PaymentWebView };
