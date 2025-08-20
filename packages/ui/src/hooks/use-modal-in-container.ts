import { RefObject, useCallback, useLayoutEffect, useRef } from 'react';

import { useEventListener } from './use-event-listener';
import { useResizeObserver } from './use-resize-observer';

import {
  getModalPositionRelativeToContainer,
  getModalPositionRelativeToScreen,
  PositionContainer,
  PositionObject,
} from '@polpo/helpers';

const convertDOMRectToPosition = (rect: DOMRectReadOnly): PositionObject => ({
  x: rect.x,
  y: rect.y,
  w: rect.width,
  h: rect.height,
  top: rect.top,
  left: rect.left,
});

export type UseModalInContainerParams<
  Container extends HTMLElement = HTMLElement,
  Modal extends HTMLElement = Container,
> = {
  windowOffset?: number;
  offset?: number;
  position?: `${PositionContainer}`;
  modalRef: RefObject<Modal>;
  containerRef?: RefObject<Container>;
  isOpen: boolean;
};

export const useModalInContainer = <
  Container extends HTMLElement = HTMLElement,
  Modal extends HTMLElement = Container,
>({
  offset = 0,
  windowOffset = 0,
  position = PositionContainer.BOTTOM,
  modalRef,
  containerRef,
  isOpen,
}: UseModalInContainerParams<Container, Modal>) => {
  const containerTemporalRef = useRef<Container>(null);

  const getPosition = useCallback(
    (modalRef: RefObject<Modal>, containerRef: RefObject<Container>) => {
      const modal = modalRef.current?.getClientRects()[0];
      const container = containerRef.current?.getClientRects()[0];

      if (!modal) {
        return;
      }

      const modalStyle: Record<string, string> = !container
        ? getModalPositionRelativeToScreen({ position: position as PositionContainer, windowOffset })
        : getModalPositionRelativeToContainer({
            c: convertDOMRectToPosition(container),
            m: convertDOMRectToPosition(modal),
            offset,
            windowOffset,
            position: position as PositionContainer,
          });

      Object.keys(modalStyle).forEach(key => {
        modalRef.current?.style.setProperty(key, modalStyle[key]);
      });
    },
    [position, windowOffset, offset],
  );

  const callback = useCallback(() => {
    if (isOpen) {
      getPosition(modalRef, containerRef ?? containerTemporalRef);
    }
  }, [getPosition, isOpen, containerRef, modalRef]);

  useLayoutEffect(callback, [callback]);

  useResizeObserver<Container>(containerRef ?? containerTemporalRef, callback);
  useResizeObserver<Modal>(modalRef, callback);
  useEventListener('resize', callback);
  useEventListener('scroll', callback, modalRef);
};
