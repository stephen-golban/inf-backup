// src/providers/revenue-cat/type.ts
// This file contains types for the RevenueCat context provider.
// Focuses on initialization and customer info management.

import type { ReactNode } from 'react';
import { CustomerInfo, PurchasesError, PurchasesOfferings, PurchasesStoreProduct } from 'react-native-purchases';

// Define the context type
export interface RevenueCatContextType {
  // State
  isLoading: boolean; // Loading state for all operations
  isInitialized: boolean; // SDK initialization loading state
  error: PurchasesError | null;
  customerInfo: CustomerInfo | null;
  offerings: PurchasesOfferings | null;
  products: PurchasesStoreProduct[] | null;

  // Core functions
  onRestorePurchases: () => Promise<void>;
  onCancelSubscription: () => Promise<void>;
  initialize: (userId?: string) => Promise<void>;
  onOneTimePurchase: (callback: (res: ValidateApplePay) => void) => Promise<void>;
  onSubscriptionPurchase: (selectedPlan: SelectedPlan, callback: (res: ValidateApplePay) => void) => Promise<void>;
}

// Provider props type
export type RevenueCatProviderProps = {
  children: ReactNode;
};

// Backend plan interface
export interface SelectedPlan {
  id: number;
  name: string;
  price: number;
  discount: number;
  isAnnual: boolean;
}

export type ValidateApplePay = {
  transactionId: string;
  subscriptionId: number;
};
