// src/providers/revenue-cat/utils.ts
// This file contains utility functions for working with RevenueCat.
// These functions help with customer subscription status checks.

import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';
import Config from 'react-native-config';
import type { SelectedPlan } from './type';
import type { CustomerInfo, PurchasesError, PurchasesPackage } from 'react-native-purchases';
import { I18nKey } from '@translations/locales';
import { isEmpty } from 'lodash';
// Product SKUs mapping from backend plan to RevenueCat SKU
export const SKU_MAPPING = {
  smart_plan: {
    annual: 'com.infodebit.smart.yearly',
    monthly: 'com.infodebit.smart.monthly',
  },
  genius_plan: {
    annual: 'com.infodebit.genius.yearly',
    monthly: 'com.infodebit.genius.monthly',
  },
  premium_plan: {
    annual: 'com.infodebit.premium.yearly.discount',
    monthly: 'com.infodebit.premium.yearly',
  },
} as const;

/**
 * Check if user has access to a specific entitlement
 * @param customerInfo The RevenueCat customer info object
 * @param entitlementId The entitlement ID to check
 * @returns True if the user has the entitlement, false otherwise
 */
export const hasEntitlement = (customerInfo: CustomerInfo | null, entitlementId: string): boolean => {
  if (!customerInfo?.entitlements?.active) return false;
  return entitlementId in customerInfo.entitlements.active;
};

/**
 * Check if user has any active entitlements
 * @param customerInfo The RevenueCat customer info object
 * @returns True if the user has any active entitlements, false otherwise
 */
export const hasProAccessEntitlement = (customerInfo: CustomerInfo | null): boolean => {
  if (!customerInfo?.entitlements?.active) return false;

  const activeEntitlements = customerInfo.entitlements.active;
  if (isEmpty(activeEntitlements)) return false;

  // Check if pro_access entitlement exists and is active
  if (activeEntitlements.hasOwnProperty('pro_access')) {
    return activeEntitlements.pro_access.isActive && activeEntitlements.pro_access.willRenew;
  }
  return false;
};

/**
 * Get the API key for RevenueCat based on the platform
 * Uses environment variables for secure configuration
 */
export const getApiKey = (): string => {
  // For iOS we use the RevenueCat API key
  if (Platform.OS === 'ios') {
    return Config.REVENUECAT_IOS_API_KEY || 'appl_BCRqUSxEsJaJOyHdKvXahwnCuGU';
  }
  // For Android, we don't use RevenueCat, so return an empty string or handle as needed
  return '';
};

/**
 * Extract transaction ID from purchase result
 * @param purchaseResult - The result object from RevenueCat purchase
 * @returns A transaction identifier string
 */
export const extractTransactionId = (purchaseResult: any): string => {
  // For iOS, we should have a direct transaction identifier
  if (purchaseResult?.transaction?.transactionIdentifier) {
    return purchaseResult.transaction.transactionIdentifier;
  }

  // RevenueCat MakePurchaseResult also includes transactions in new SDK versions
  if (purchaseResult?.transactions && purchaseResult.transactions.length > 0) {
    const latestTransaction = purchaseResult.transactions[0];
    if (latestTransaction.transactionIdentifier) {
      return latestTransaction.transactionIdentifier;
    }
  }

  // Check receipt info
  if (purchaseResult?.customerInfo?.originalPurchaseDate && purchaseResult?.customerInfo?.entitlements?.active) {
    const entitlementId = Object.keys(purchaseResult.customerInfo.entitlements.active)[0];
    const purchaseDate = purchaseResult.customerInfo.originalPurchaseDate;
    return `${entitlementId}_${purchaseDate}`;
  }

  // Use product identifier as a last resort
  if (purchaseResult?.productIdentifier) {
    const timestamp = Date.now();
    return `${purchaseResult.productIdentifier}_${timestamp}`;
  }

  // Ultimate fallback
  console.warn('Could not extract a reliable transaction ID, generating a fallback');
  return `transaction_${Date.now()}`;
};

/**
 * Find a package by its SKU from available packages
 * @param packages - Array of available subscription packages
 * @param sku - SKU to search for
 * @returns Matching package or null if not found
 */
export const findOfferingsPackageBySku = (packages: PurchasesPackage[], sku: string): PurchasesPackage | null => {
  return packages.find(pkg => pkg.product.identifier === sku) || null;
};

/**
 * Find the corresponding SKU for a selected subscription plan
 * @param selectedPlan - The plan object containing name and billing period
 * @returns The SKU string for the selected plan
 * @throws Error if plan or period is invalid
 */
export const findSkuForPlan = (selectedPlan: SelectedPlan): string => {
  const { name, isAnnual } = selectedPlan;
  const planKey = name as keyof typeof SKU_MAPPING;
  const periodKey = isAnnual ? 'annual' : 'monthly';

  if (!SKU_MAPPING[planKey]) {
    throw new Error(`Unknown plan: ${name}`);
  }

  const sku = SKU_MAPPING[planKey][periodKey];

  if (!sku) {
    throw new Error(`No SKU found for ${name} (${periodKey})`);
  }

  return sku;
};

export const findPackageOrProduct = async (sku: string, isOneTimePurchase: boolean, packages: PurchasesPackage[]) => {
  if (isOneTimePurchase) {
    const products = await Purchases.getProducts([sku]);
    return products[0];
  }

  const pkg = findOfferingsPackageBySku(packages, sku);
  return pkg;
};

/**
 * Maps RevenueCat error codes to translation keys
 * @param error The RevenueCat error object
 * @returns The translation key for the error message
 */
export const getErrorTranslationKey = (error: PurchasesError): I18nKey => {
  // Check the error code from RevenueCat
  const code = error.code;

  // We need to use string comparison since error codes might vary
  if (code.includes('cancelled') || code.includes('canceled')) {
    return 'ui:toasts:revenuecat_purchase_cancelled' as I18nKey;
  }
  if (code.includes('not_available') || code.includes('unavailable')) {
    return 'ui:toasts:revenuecat_product_not_available' as I18nKey;
  }
  if (code.includes('store') || code.includes('app_store')) {
    return 'ui:toasts:revenuecat_store_problem' as I18nKey;
  }
  if (code.includes('pending')) {
    return 'ui:toasts:revenuecat_purchase_pending' as I18nKey;
  }
  if (code.includes('receipt') || code.includes('validation')) {
    return 'ui:toasts:revenuecat_receipt_validation_failed' as I18nKey;
  }
  if (code.includes('user') || code.includes('app_user_id')) {
    return 'ui:toasts:revenuecat_invalid_app_user_id' as I18nKey;
  }

  // Default error message
  return 'ui:toasts:revenuecat_unknown_error' as I18nKey;
};
