import { useReducer } from 'react';

import type { Action, RequestState } from './type';

export const createInitialState = <Data>(data?: Data) => ({
  data: typeof data === 'undefined' ? undefined : data,
  error: undefined,
  loading: false,
});

const createReducer =
  <Data>() =>
  (
    state: RequestState<Data>,
    action: Action<Data>,
    /* eslint-disable-next-line consistent-return */
  ): RequestState<Data> => {
    /* eslint-disable-next-line default-case */
    switch (action.type) {
      case 'REQUEST_INIT':
        return {
          ...state,
          error: undefined,
          loading: true,
        };
      case 'REQUEST_SUCCESS':
        return {
          ...state,
          data: action.payload,
          error: undefined,
          loading: false,
        };
      case 'REQUEST_FAILED':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
    }
  };

export default <Data>(ssrData?: Data) => useReducer(createReducer<Data>(), createInitialState(ssrData));
