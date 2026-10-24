import React, { useCallback, useLayoutEffect, useRef } from 'react';

/** Wraps a dispatch so it is ignored after the component unmounts. */
export const useSafeDispatch = <T>(dispatch: React.Dispatch<T>): ((action: T) => void) => {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(
    (...args: Parameters<React.Dispatch<T>>) => {
      if (mounted.current) {
        dispatch(...args);
      }
    },
    [dispatch],
  );
};
