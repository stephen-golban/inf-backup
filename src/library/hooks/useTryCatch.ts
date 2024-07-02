import { DependencyList, useCallback } from 'react';
import { useToast } from 'react-native-toast-notifications';

/**
 * Custom hook to wrap a function in a try-catch block. It catches any errors thrown
 * by the function and displays them using a toast notification. This hook supports
 * both synchronous and asynchronous functions.
 *
 * @template T The function type that extends from a function that can take any arguments and return any type.
 * @param {T} callback - The function to be wrapped in the try-catch block.
 * @returns {T} The wrapped function with error handling.
 */
function useTryCatch<T extends (...args: any[]) => any>(callback: T): T {
  const toast = useToast();

  return ((...args: any[]) => {
    try {
      const result = callback(...args);
      if (result instanceof Promise) {
        return result.catch((error: any) => {
          toast.show(error.message, { type: 'danger' });
        });
      }
      return result;
    } catch (error: any) {
      console.log(error);
      toast.show(error.message, { type: 'danger' });
      throw error;
    }
  }) as T;
}

/**
 * Custom hook that wraps a function in a try-catch block and memoizes it using useCallback.
 * It supports both synchronous and asynchronous functions. The callback is memoized with dependencies,
 * useful for functions dependent on certain values and should only update when those values change.
 *
 * @template T The function type that extends from a function that can take any arguments and return any type.
 * @param {T} callback - The function to be wrapped and memoized.
 * @param {DependencyList} deps - The dependency array for useCallback, determining when the memoized function should update.
 * @returns {T} The memoized and wrapped function with error handling.
 */
function useTryCatchWithCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T {
  // const toast = useToast();

  return useCallback(
    (...args: any[]) => {
      try {
        const result = callback(...args);
        if (result instanceof Promise) {
          return result.catch((error: any) => {
            // toast.show(error.message, { type: 'danger' });
          });
        }
        return result;
      } catch (error: any) {
        // toast.show(error.message, { type: 'danger' });
        throw error;
      }
    },
    [callback, ...deps],
  ) as T;
}

export { useTryCatch, useTryCatchWithCallback };
