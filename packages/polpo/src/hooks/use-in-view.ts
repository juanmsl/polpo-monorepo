import { useRef, useState } from 'react';

import { useIntersectionObserver } from './use-intersection-observer';

/** Returns `{ ref, inView }`: whether the element referenced by `ref` is in the viewport. */
export const useInView = (initOptions: IntersectionObserverInit = {}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useIntersectionObserver(
    ref,
    ([entry]) => {
      setInView(entry.isIntersecting);
    },
    initOptions,
  );

  return { ref, inView };
};
