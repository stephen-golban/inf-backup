// import React from 'react';

// import { BASE_OAUTH_URL, OAUTH_TOKEN, api } from '../base';
// import { inRange } from 'lodash';
// import { resetAppStore } from '@store/app';
// import { useToast } from 'react-native-toast-notifications';

// import type { AxiosError, AxiosResponse } from 'axios';
// import type { Call, RequestMethod, UseAxiosRequestReturn } from './type';

// const useAxiosRequest = <T extends object = any>(
//   url: string,
//   method: RequestMethod = 'get',
//   isOAUTH = false,
//   shoutError = true,
//   overwrite = false,
// ) => {
//   const toast = useToast();
//   const [error, setError] = React.useState(undefined);
//   const [loading, setLoading] = React.useState(false);

//   const controllerRef = React.useRef(new AbortController());

//   const cancel = React.useCallback(() => controllerRef.current.abort(), [controllerRef]);

//   const handleSuccess = React.useCallback((response: AxiosResponse<T, any>, successCallback?: (response: T) => void) => {
//     if (inRange(response.status, 200, 210) || response.data) {
//       successCallback && successCallback(response.data);
//       return response.data;
//     }
//   }, []);

//   const handleError = React.useCallback(
//     (err: AxiosError<any>) => {
//       if (!err.response || !err.response.data) {
//         toast.show('Sorry, but the service is experiencing a problem. Please try again in a few moments.', { type: 'danger' });
//       } else {
//         const status = err.response.data.status;
//         const detail = err.response.data[0]?.msg || err?.response?.data?.msg;

//         if (detail) {
//           setError(detail);

//           if (shoutError) {
//             toast.show(detail, { type: 'danger' });
//           }

//           if (detail === 'Token has expired' || [401, 404].includes(status)) {
//             resetAppStore();
//           }
//         }
//       }

//       if (__DEV__) {
//         console.log(err);
//         console.log(err.response?.data);
//       }
//     },
//     [shoutError, toast],
//   );

//   const call = React.useCallback<Call<T>>(
//     async (...args) => {
//       try {
//         setLoading(true);
//         const response = await api.request<T>({
//           baseURL: overwrite ? url : isOAUTH ? BASE_OAUTH_URL : api.defaults.baseURL,
//           url: args[2]?.additionalUrl ? url + args[2].additionalUrl : url,
//           method,
//           data: args[0],
//           signal: controllerRef.current.signal,
//           ...args[2],
//           headers: isOAUTH
//             ? {
//                 ...args[2]?.headers,
//                 // Accept: 'application/json;charset=UTF-8',
//                 Authorization: `Basic ${OAUTH_TOKEN}`,
//                 // 'Content-Type': 'multipart/form-data',
//               }
//             : args[2]?.headers,
//         });

//         return handleSuccess(response, args[1]);
//       } catch (err: any) {
//         handleError(err);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [handleError, handleSuccess],
//   );

//   const memoized = React.useMemo<UseAxiosRequestReturn<T>>(() => {
//     return [call, { cancel, loading, error, isSuccessfulRequest: !loading && !error }];
//   }, [error, loading, cancel, call]);

//   return memoized;
// };

// export default useAxiosRequest;

export { default as useAxios } from './use-axios';
export { default as useLazyAxios } from './use-lazy-axios';
