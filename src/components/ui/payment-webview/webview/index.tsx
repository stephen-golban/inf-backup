import React from 'react';

import { useTryCatch } from '@library/hooks';

import WebView, { type WebViewNavigation } from 'react-native-webview';

interface IFunnelWebview {
  url: string;
  onDismiss: () => void;
  onPaymentSuccess(payId: string, orderId: string): void;
}

const FunnelWebview: React.FC<IFunnelWebview> = ({ url, onDismiss, onPaymentSuccess }) => {
  if (!url) {
    return null;
  }

  const handleNavigationStateChange = useTryCatch(async (navState: WebViewNavigation) => {
    const { url } = navState;

    if (url.includes('call-back-payment')) {
      const payIdMatch = url.match(/payId=([^&]*)/);
      const orderIdMatch = url.match(/orderId=([^&]*)/);

      const payId = payIdMatch ? payIdMatch[1] : null;
      const orderId = orderIdMatch ? orderIdMatch[1] : null;
      if (payId && orderId) {
        onPaymentSuccess(payId, orderId);
        return onDismiss();
      }
      return onDismiss();
    }
  });

  return (
    <WebView
      source={{ uri: url }}
      startInLoadingState={true}
      style={{ backgroundColor: '#d3d7da' }}
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
};

export default FunnelWebview;
