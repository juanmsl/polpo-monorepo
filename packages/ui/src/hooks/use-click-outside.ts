import { RefObject } from 'react';

import { useEventListener } from './use-event-listener';

const checkIsOutside = (ref: RefObject<HTMLElement>, target: Node) => {
  return ref.current && !ref.current.contains(target);
};

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T> | Array<RefObject<T>>,
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
