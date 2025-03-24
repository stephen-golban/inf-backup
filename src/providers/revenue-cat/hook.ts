import { Linking, Platform } from 'react-native';
import Purchases from 'react-native-purchases';

import { useMemo, useState } from 'react';
import { useLazyAxios } from '@api/hooks';
import { translate } from '@translations/translate';
import { useAppDataCheckStore } from '@store/data-check';
import { useToast } from 'react-native-toast-notifications';
import { useLastInquiryService } from '@services/last-inquiry';
import { useCurrentSubscriptionExpiryService, useGetSubscription } from '@services/subscription';

import {
  getApiKey,
  findSkuForPlan,
  extractTransactionId,
  getErrorTranslationKey,
  hasProAccessEntitlement,
  findOfferingsPackageBySku,
  SKU_MAPPING,
} from './utils';

import type { I18nKey } from '@translations/locales';
import type { SelectedPlan, ValidateApplePay } from './type';
import type { CreditReportEventsApiResponse } from '@typings/responses';
import type { CustomerInfo, MakePurchaseResult, PurchasesError, PurchasesOfferings, PurchasesStoreProduct } from 'react-native-purchases';

// Success message translation keys
const PURCHASE_SUCCESS_KEY = 'ui:toasts:revenuecat_purchase_success' as I18nKey;
const RESTORE_SUCCESS_KEY = 'ui:toasts:revenuecat_restore_success' as I18nKey;

export default function useProvider() {
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const [setupLoading, setSetupLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const [error, setError] = useState<PurchasesError | null>(null);
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [products, setProducts] = useState<PurchasesStoreProduct[] | null>(null);

  const toast = useToast();
  const inquiry = useLastInquiryService();
  const subscription = useGetSubscription();
  const isSubscriptionExpired = useCurrentSubscriptionExpiryService();

  const [applePay, applePayUtils] = useLazyAxios<ValidateApplePay>('/payment-purchases/apple-pay', { method: 'post' });

  const [purchaseSubscription, purchaseSubscriptionUtils] = useLazyAxios<string>('/subscription-management/purchase', { method: 'post' });

  const [reportEvents, reportEventsUtils] = useLazyAxios<CreditReportEventsApiResponse>({
    method: 'post',
    url: '/credit-report-events?subscriptionFreeAccess=true',
  });

  const [removeSubscription, removeSubscriptionUtils] = useLazyAxios<string>({
    method: 'post',
    url: '/subscription-management/unsubscribe',
  });

  const loadingStates = [
    localLoading,
    subscription.loading,
    applePayUtils.loading,
    inquiry.loadingInquiry,
    reportEventsUtils.loading,
    purchaseSubscriptionUtils.loading,
  ];
  // Determine if any loading state is active
  const computedLoading = useMemo(() => loadingStates.some(Boolean), loadingStates);

  const abortRequests = () => {
    inquiry.cancel();
    subscription.cancel();
    applePayUtils.cancel();
    reportEventsUtils.cancel();
    purchaseSubscriptionUtils.cancel();
  };

  const refreshAppData = async (forSubscription = false) => {
    forSubscription && (await subscription.getSubscription());
    await inquiry.fetchInquiryReport();
    await reportEvents(undefined, res => useAppDataCheckStore.setState({ reportEvents: res }));
  };

  /**
   * Handle RevenueCat errors with proper user feedback
   * @param err The error object from RevenueCat
   * @param abortFn Optional function to call for aborting pending requests
   */
  const handleRevenueCatError = (err: any, abortFn?: () => void) => {
    console.error('RevenueCat error:', err);

    if (abortFn) {
      abortFn();
    }

    const purchaseError = err as PurchasesError;
    setError(purchaseError);

    // Show translated error message to user
    const translationKey = getErrorTranslationKey(purchaseError);
    toast.show(translate(translationKey), { type: 'error' });
  };

  const fetchOfferings = async () => {
    try {
      setSetupLoading(true);
      const offerings = await Purchases.getOfferings();
      setOfferings(offerings);
    } catch (error) {
      handleRevenueCatError(error);
    } finally {
      setSetupLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setSetupLoading(true);
      const products = await Purchases.getProducts(['one_time_purchase', SKU_MAPPING.smart_plan.monthly]);
      setProducts(products);
    } catch (error) {
      handleRevenueCatError(error);
    } finally {
      setSetupLoading(false);
    }
  };

  const fetchCustomerInfo = async () => {
    try {
      setSetupLoading(true);
      const info = await Purchases.getCustomerInfo();
      setCustomerInfo(info);
      return info;
    } catch (err) {
      handleRevenueCatError(err);
    } finally {
      setSetupLoading(false);
    }
  };

  const handleValidateApplePay = async (
    product: PurchasesStoreProduct,
    purchaseResult: MakePurchaseResult,
    callback: (res: ValidateApplePay) => void,
  ) => {
    setCustomerInfo(purchaseResult.customerInfo);
    const transactionId = extractTransactionId(purchaseResult);

    const body = {
      transactionId,
      amount: product.price,
      productId: product.identifier,
      paymentServiceName: 'APPLE_PAY',
    };

    // Purchase the package
    await applePay(body, callback);
    return;
  };

  const onOneTimePurchase = async (callback: (res: ValidateApplePay) => void) => {
    try {
      setLocalLoading(true);
      const sku = 'one_time_purchase';
      const products = await Purchases.getProducts([sku]);
      const product = products[0];

      if (!product) {
        throw new Error(`Product with SKU ${sku} not found`);
      }

      const purchaseResult = await Purchases.purchaseStoreProduct(product);

      const onSuccess = async (res: ValidateApplePay) => {
        await refreshAppData();
        toast.show(translate(PURCHASE_SUCCESS_KEY), { type: 'success' });
        callback(res);
      };

      return await handleValidateApplePay(product, purchaseResult, onSuccess);
    } catch (err) {
      handleRevenueCatError(err, abortRequests);
    } finally {
      setLocalLoading(false);
    }
  };

  const processSubscriptionPayment = async (
    data: ValidateApplePay,
    selectedPlan: SelectedPlan,
    successCallback?: (res: ValidateApplePay) => void,
  ) => {
    try {
      setLocalLoading(true);

      // Send transaction ID to backend
      const body = {
        retentionOffer: false,
        automaticTermExtension: true,
        reservedSubscriptionId: null,
        paymentServiceName: 'APPLE_PAY',
        transactionId: data.transactionId,
        subscriptionId: data.subscriptionId,
        annualPayment: selectedPlan.isAnnual,
      };

      // Call your backend API to register the purchase
      await purchaseSubscription(body, async msg => {
        if (msg) {
          await refreshAppData(true);
          toast.show(msg, { type: 'success' });
          successCallback?.(data);
        }
      });

      // Refresh subscription data from backend
      // refreshSubscriptions();
    } catch (err) {
      abortRequests();
      console.log(err);
      setError(err as PurchasesError);
    } finally {
      setLocalLoading(false);
    }
  };

  const onSubscriptionPurchase = async (selectedPlan: SelectedPlan, callback: (res: ValidateApplePay) => void) => {
    try {
      setLocalLoading(true);
      if (offerings && offerings.current?.availablePackages) {
        const packages = offerings.current.availablePackages;

        const sku = findSkuForPlan(selectedPlan);
        const pkg = findOfferingsPackageBySku(packages, sku);

        if (!pkg) {
          throw new Error(`Product with SKU ${sku} not found`);
        }

        const purchaseResult = await Purchases.purchasePackage(pkg);

        const onSuccess = async (data: ValidateApplePay) => {
          await processSubscriptionPayment(data, selectedPlan, callback);
          toast.show(translate(PURCHASE_SUCCESS_KEY), { type: 'success' });
        };

        return await handleValidateApplePay(pkg.product, purchaseResult, onSuccess);
      }
    } catch (err) {
      handleRevenueCatError(err, abortRequests);
    } finally {
      setLocalLoading(false);
    }
  };

  const initialize = async (userId?: string) => {
    try {
      setSetupLoading(true);
      setError(null);

      // Only initialize RevenueCat on iOS
      if (Platform.OS !== 'ios') {
        console.log('[RevenueCat] Skipping initialization on non-iOS platform');
        setIsInitialized(true);
        return;
      }

      const apiKey = getApiKey();
      if (!apiKey) {
        console.error('[RevenueCat] No API key available for initialization');
        setIsInitialized(false);
        return;
      }

      console.log('[RevenueCat] Initializing SDK', userId ? `with user ID: ${userId}` : 'with anonymous ID');

      // Configure the SDK with your API key and user ID
      Purchases.configure({ apiKey, appUserID: userId });
      Purchases.setLogLevel(__DEV__ ? Purchases.LOG_LEVEL.DEBUG : Purchases.LOG_LEVEL.INFO);

      // Make sure we've synced purchases from App Store
      await Purchases.syncPurchases();

      // Fetch initial data
      await fetchProducts();
      await fetchOfferings();
      await fetchCustomerInfo();

      console.log('[RevenueCat] SDK initialized successfully');
      setIsInitialized(true);
    } catch (err) {
      handleRevenueCatError(err);
      setIsInitialized(false);
    } finally {
      setSetupLoading(false);
    }
  };

  const manageSubscription = async () => {
    try {
      const info = await fetchCustomerInfo();

      if (info?.managementURL) {
        // Open the platform's subscription management page
        await Linking.openURL(info.managementURL);
        return true;
      } else {
        console.warn('[RevenueCat] No management URL available for this customer');
        return false;
      }
    } catch (err) {
      const purchasesError = err as PurchasesError;
      setError(purchasesError);
      return false;
    }
  };

  const restorePurchases = async () => {
    try {
      setLocalLoading(true);
      const restoreResult = await Purchases.restorePurchases();
      setCustomerInfo(restoreResult);

      // Only show success message if there were actually purchases to restore
      if (restoreResult?.entitlements?.active && Object.keys(restoreResult.entitlements.active).length > 0) {
        toast.show(translate(RESTORE_SUCCESS_KEY), { type: 'success' });
      }

      return restoreResult;
    } catch (err) {
      handleRevenueCatError(err);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleAppStateChange = async (nextAppState: string) => {
    if (nextAppState === 'active' && isInitialized) {
      // Refresh customer info when app comes to foreground
      const info = await fetchCustomerInfo();

      if (!info) return;

      // Check if user has active subscriptions OR entitlements
      const hasActiveSubscriptions = info.activeSubscriptions && info.activeSubscriptions.length > 0;

      if (!hasProAccessEntitlement(info) || !hasActiveSubscriptions) {
        // User's subscription has been canceled in Apple sandbox
        console.log('[RevenueCat] User has no active subscriptions or entitlements');
        if (!subscription.subscription?.id) {
          console.log('No active subscription ID to cancel');
          return;
        }

        console.log('Subscription expired, canceling');
        await removeSubscription({ subscriptionId: subscription.subscription?.id });

        // Update subscription data
        await subscription.getSubscription();
        return;
      }
    }
  };

  return {
    error,
    products,
    offerings,
    customerInfo,
    isInitialized,
    loading: computedLoading,
    initialize,
    fetchOfferings,
    setCustomerInfo,
    restorePurchases,
    onOneTimePurchase,
    manageSubscription,
    handleAppStateChange,
    onSubscriptionPurchase,
  };
}
