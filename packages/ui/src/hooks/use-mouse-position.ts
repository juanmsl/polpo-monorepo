import React, { useRef, useState } from 'react';

import { useEventListener } from './use-event-listener';

type MousePosition = {
  x: null | number;
  y: null | number;
  elementX: number | null;
  elementY: number | null;
  elementPositionX: number | null;
  elementPositionY: number | null;
};

const getMousePosition = (domRect: DOMRect, e: MouseEvent) => {
  const { left, top } = domRect;
  const containerPositionX = left + window.scrollX;
  const containerPositionY = top + window.scrollY;
  const containerX = e.pageX - containerPositionX;
  const containerY = e.pageY - containerPositionY;

  return {
    x: e.pageX,
    y: e.pageY,
    elementX: containerX,
    elementY: containerY,
    elementPositionX: containerPositionX,
    elementPositionY: containerPositionY,
  };
};

export const useMousePosition = (containerRef?: React.RefObject<HTMLElement | SVGElement | null>) => {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<MousePosition>({
    x: null,
    y: null,
    elementX: null,
    elementY: null,
    elementPositionX: null,
    elementPositionY: null,
  });

  const mouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    setPosition(prev => ({ ...prev, x: clientX, y: clientY }));

    if (containerRef?.current instanceof Element) {
      const newState = getMousePosition(containerRef.current.getBoundingClientRect(), e);
      setPosition(prev => ({
        ...prev,
        ...newState,
      }));
    } else if (ref.current instanceof Element) {
      const newState = getMousePosition(ref.current.getBoundingClientRect(), e);
      setPosition(prev => ({
        ...prev,
        ...newState,
      }));
    }
  };

  useEventListener('mousemove', mouseMove);

  return { ...position, ref };
};
