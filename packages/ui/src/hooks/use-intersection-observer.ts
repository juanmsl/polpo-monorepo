import { RefObject, useEffect } from 'react';

export const useIntersectionObserver = <T extends Element>(
  ref: RefObject<T> | Array<RefObject<T>>,
  callback: IntersectionObserverCallback,
  initOptions: IntersectionObserverInit = {},
) => {
  useEffect(() => {
    const refs = Array.isArray(ref) ? ref : [ref];

    const observer = new IntersectionObserver(callback, initOptions);

    refs.forEach(r => r.current && observer.observe(r.current));

    return () => {
      observer.disconnect();
    };
  }, [callback, initOptions, ref]);
};
