import { useRef, useState } from 'react';

import { useIntersectionObserver } from './use-intersection-observer';

export const useInView = (initOptions: IntersectionObserverInit = {}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<Element>(null);

  useIntersectionObserver(
    ref,
    ([entry]) => {
      setInView(entry.isIntersecting);
    },
    initOptions,
  );

  return { ref, inView };
};
