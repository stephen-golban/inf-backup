// src/providers/revenue-cat/index.ts
// This file provides a RevenueCat context provider structure.
// Focused on initialization with user ID and customer info management.
// Note: This implementation is for iOS only, Android uses a different payment system (MAIB).

import React from 'react';
import { AppState, Platform } from 'react-native';

import useProvider from './hook';
import { useAppStore } from '@store/app';

import type { RevenueCatContextType, RevenueCatProviderProps } from './type';

// Create the context with default value
const RevenueCatContext = React.createContext<RevenueCatContextType | undefined>(undefined);

// Provider component
const RevenueCatProvider: React.FC<RevenueCatProviderProps> = ({ children }) => {
  const {user, isAuthenticated} = useAppStore()
  const { error, loading, offerings, customerInfo,products, isInitialized, initialize, ...fns } = useProvider();

  // Initialize RevenueCat when user is authenticated
  React.useEffect(() => {
    if (isAuthenticated && user?.id) {
      initialize(String(user.id));
    }
  }, [isAuthenticated, user?.id]);

  // Set up AppState listener to refresh purchases when app comes to foreground
  React.useEffect(() => {
    // Only register listeners on iOS
    if (Platform.OS !== 'ios') return;

    // Subscribe to app state changes
    const appStateSubscription = AppState.addEventListener('change', fns.handleAppStateChange);

    // Clean up subscription on unmount
    return () => {
      appStateSubscription.remove();
    };
  }, [fns.handleAppStateChange]);

  // Helper functions for common operations
  const onCancelSubscription = async () => {
    if (Platform.OS !== 'ios') return;
    await fns.manageSubscription();
  };

  const onRestorePurchases = async () => {
    if (Platform.OS !== 'ios') return;
    await fns.restorePurchases();
  };

  // Context value with state and functions
  const value: RevenueCatContextType = {
    // State
    error,
    products,
    offerings,
    customerInfo,
    isInitialized,
    isLoading: loading,

    // Functions
    initialize,
    onOneTimePurchase: fns.onOneTimePurchase,
    onRestorePurchases,
    onCancelSubscription,
    onSubscriptionPurchase: fns.onSubscriptionPurchase,
  };

  return <RevenueCatContext.Provider value={value}>{children}</RevenueCatContext.Provider>;
};

// Custom hook to use the context
const useRevenueCat = (): RevenueCatContextType => {
  const context = React.useContext(RevenueCatContext);

  if (context === undefined) {
    throw new Error('useRevenueCat must be used within a RevenueCatProvider');
  }

  return context;
};

export * from './type';
export { RevenueCatProvider, useRevenueCat };
