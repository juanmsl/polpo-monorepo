import { useCallback, useRef, useState } from 'react';

import { useEventListener } from './use-event-listener';

export const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  useEventListener('mouseenter', handleMouseEnter, ref);
  useEventListener('mouseleave', handleMouseLeave, ref);

  return isHovered;
};
