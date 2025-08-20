import React, { useCallback, useMemo, useReducer } from 'react';

import { useSafeDispatch } from './use-safe-dispatch';

type AsyncState<T> =
  | {
      status: 'idle' | 'pending';
      data?: null;
      error?: null;
    }
  | {
      status: 'resolved';
      data: T;
      error: null;
    }
  | {
      status: 'rejected';
      data: null;
      error: Error;
    };

type AsyncAction<T> =
  | { type: 'reset' }
  | { type: 'pending' }
  | { type: 'resolved'; data: T }
  | { type: 'rejected'; error: Error };

const asyncReducer = <T>(_state: AsyncState<T>, action: AsyncAction<T>): AsyncState<T> => {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending' as const, data: null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved' as const, data: action.data, error: null };
    }
    case 'rejected': {
      return { status: 'rejected' as const, data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
    }
  }
};

export const useAsync = <T>(
  initialState?: AsyncState<T>,
): AsyncState<T> & {
  setData: (data: T) => void;
  setError: (error: Error) => void;
  run: (promise: Promise<T>) => void;
} => {
  const [asyncState, unsafeDispatch] = useReducer<React.Reducer<AsyncState<T>, AsyncAction<T>>>(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });
  const dispatch = useSafeDispatch(unsafeDispatch);

  const run = useCallback(
    (promise: Promise<T>) => {
      dispatch({ type: 'pending' });
      promise.then(
        data => {
          dispatch({ type: 'resolved', data });
        },
        (error: Error) => {
          dispatch({ type: 'rejected', error });
        },
      );
    },
    [dispatch],
  );

  const setData = useCallback((data: T) => dispatch({ type: 'resolved', data }), [dispatch]);

  const setError = useCallback((error: Error) => dispatch({ type: 'rejected', error }), [dispatch]);

  return useMemo(
    () => ({
      setData,
      setError,
      run,
      ...asyncState,
    }),
    [asyncState, run, setData, setError],
  );
};
