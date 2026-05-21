import { RefObject, useEffect } from 'react';

export const useResizeObserver = <T extends Element>(
  ref: RefObject<T | null> | Array<RefObject<T | null>>,
  callback: ResizeObserverCallback,
) => {
  useEffect(() => {
    const refs = Array.isArray(ref) ? ref : [ref];

    const observer = new ResizeObserver(callback);

    refs.forEach(r => r.current && observer.observe(r.current));

    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);
};
