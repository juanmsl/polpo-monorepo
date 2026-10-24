import { RefObject, useCallback, useRef, useState } from 'react';

import { useEventListener } from './use-event-listener';

/**
 * Returns `{ ref, isHovered }`: whether the pointer is over the element referenced by `ref`.
 * Pass your own `targetRef` to track an element that already has a ref.
 */
export const useHover = <T extends HTMLElement = HTMLElement>(targetRef?: RefObject<T | null>) => {
  const [isHovered, setIsHovered] = useState(false);
  const innerRef = useRef<T>(null);
  const ref = targetRef ?? innerRef;

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  useEventListener('mouseenter', handleMouseEnter, ref);
  useEventListener('mouseleave', handleMouseLeave, ref);

  return { ref, isHovered };
};
