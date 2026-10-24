import { useEffect, useRef } from 'react';

/** Returns how many times the component has rendered (debugging). */
export const useRenderCount = () => {
  const count = useRef(1);

  useEffect(() => {
    count.current++;
  });

  return count.current;
};
