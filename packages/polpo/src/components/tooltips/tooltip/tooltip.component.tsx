import React, { cloneElement } from 'react';

import { cn, PositionContainer } from '../../../helpers';
import { useEventListener, useModal } from '../../../hooks';
import { Modal } from '../../modals';

import './tooltip.styles.css';

export type TooltipProps = {
  position?:
    | `${PositionContainer.TOP}`
    | `${PositionContainer.LEFT}`
    | `${PositionContainer.RIGHT}`
    | `${PositionContainer.BOTTOM}`;
  offset?: number | `${number}`;
  disabled?: boolean;
  children: React.ReactElement<{
    ref: React.RefObject<HTMLElement | null>;
  }>;
  content: React.ReactNode;
};

export const Tooltip = ({
  position = PositionContainer.TOP,
  children,
  content,
  offset = 5,
  disabled = false,
}: TooltipProps) => {
  const { containerRef, openModal, closeModal, isOpen } = useModal();

  useEventListener('mouseenter', () => openModal(), containerRef);
  useEventListener('mouseleave', () => closeModal(), containerRef);

  if (disabled) return children;

  return (
    <>
      {cloneElement(children, { ref: containerRef })}

      <Modal
        backdrop='none'
        id='tooltip'
        isOpen={isOpen}
        containerRef={containerRef}
        onClose={closeModal}
        position={position}
        className={cn('polpo-tooltip', position)}
        closeOnClickOutside={false}
        offset={6 + +offset}
        windowOffset={10}
        transitionDuration={100}
        closeAnimationClassName='close-animation'
      >
        <span className='tooltip-content'>{content}</span>
      </Modal>
    </>
  );
};
