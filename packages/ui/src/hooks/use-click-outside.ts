import { RefObject } from 'react';

import { useEventListener } from './use-event-listener';

const checkIsOutside = (ref: RefObject<HTMLElement | null>, target: Node) => {
  return ref.current && !ref.current.contains(target);
};

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null> | Array<RefObject<T | null>>,
  callback: () => void,
) => {
  useEventListener('keydown', e => {
    if (e.key === 'Escape') {
      callback();
    }
  });

  useEventListener('mousedown', event => {
    const target = event.target as Node;

    if (!target?.isConnected) {
      return;
    }

    const isOutside = (Array.isArray(ref) ? ref : [ref]).every(r => checkIsOutside(r, target));

    if (isOutside) {
      callback();
    }
  });
};
