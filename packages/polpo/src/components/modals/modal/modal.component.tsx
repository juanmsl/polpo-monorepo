import React, { CSSProperties, useMemo, useRef } from 'react';

import { cn } from '../../../helpers';
import {
  ModalState,
  useClickOutside,
  useModalInContainer,
  UseModalInContainerParams,
  useModalTransition,
  UseModalTransitionParams,
} from '../../../hooks';
import { Portal } from '../portal';

import { Backdrop, BackdropProps } from './modal.backdrop';
import './modal.styles.css';

export type ModalProps = Omit<BackdropProps, 'modalState'> &
  UseModalTransitionParams &
  Omit<UseModalInContainerParams, 'modalRef'> & {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
    className?: string;
    style?: React.CSSProperties;
    rootStyle?: CSSProperties;
    animation?: 'none' | 'fade-down' | 'bounce';
    closeAnimationClassName?: string;
    modalRef?: React.RefObject<HTMLElement | null>;
    closeOnClickOutside?: boolean;
  };

export const Modal = ({
  id,
  children,
  isOpen,
  onClose,
  className = '',
  style = {},
  rootStyle = {},
  animation = 'fade-down',
  closeAnimationClassName = 'modal-close',
  modalRef: modalRefProp,
  closeOnClickOutside = true,
  transitionDuration = 500,
  windowOffset = 10,
  offset = 20,
  position,
  containerRef,
  zIndex = 1000,
  ...backdropProps
}: ModalProps) => {
  const uuid = useMemo(() => crypto.randomUUID(), []);
  const modalRef = useRef<HTMLElement>(null);
  const { modalState, isVisible } = useModalTransition({
    transitionDuration,
    isOpen,
  });

  useModalInContainer({
    modalRef: modalRefProp ?? modalRef,
    containerRef,
    offset,
    windowOffset,
    position,
    isOpen: isVisible,
  });

  useClickOutside<HTMLElement>(modalRefProp ?? modalRef, () => {
    if (isOpen && closeOnClickOutside) {
      onClose();
    }
  });

  if (!isVisible) {
    return null;
  }

  return (
    <Portal id={`modal-${id}-${uuid}`}>
      <Backdrop {...backdropProps} modalState={modalState} zIndex={zIndex} />
      <section
        className='polpo-modal'
        ref={modalRefProp ?? modalRef}
        style={{
          maxWidth: `calc(100dvw - ${windowOffset * 2}px)`,
          maxHeight: `calc(100dvh - ${windowOffset * 2}px)`,
          ...rootStyle,
          zIndex: +zIndex + 1,
        }}
      >
        <section
          style={{ ...style, animationDuration: `${transitionDuration}ms` }}
          className={cn(
            'polpo-modal-content',
            className,
            Boolean(animation) && animation !== 'none' && `animation-${animation}`,
            (modalState === ModalState.CLOSING || modalState === ModalState.CLOSED) && closeAnimationClassName,
          )}
        >
          {children}
        </section>
      </section>
    </Portal>
  );
};
