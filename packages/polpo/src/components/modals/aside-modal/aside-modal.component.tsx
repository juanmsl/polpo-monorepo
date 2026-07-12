import { CSSProperties, useMemo } from 'react';
import { LuX } from 'react-icons/lu';

import { cn, PositionContainer } from '../../../helpers';
import { Modal, ModalProps } from '../modal';

import './aside-modal.styles.css';

type AsideModalProps = Omit<
  ModalProps,
  'id' | 'animation' | 'closeAnimationClassName' | 'position' | 'rootStyle' | 'className' | 'style'
> & {
  position?:
    | `${PositionContainer.TOP}`
    | `${PositionContainer.LEFT}`
    | `${PositionContainer.RIGHT}`
    | `${PositionContainer.BOTTOM}`;
  size?: number | `${number}px` | `${number}em`;
  className?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  noCloseButton?: boolean;
};

export const AsideModal = ({
  children,
  isOpen,
  onClose,
  position = PositionContainer.LEFT,
  size,
  className = '',
  contentClassName = '',
  noCloseButton = false,
  ...modalProps
}: AsideModalProps) => {
  const modalRootStyles = useMemo<CSSProperties>(() => {
    const computedSize = {
      [PositionContainer.TOP]: { height: size, width: '100%' },
      [PositionContainer.LEFT]: { height: '100%', width: size },
      [PositionContainer.RIGHT]: { height: '100%', width: size },
      [PositionContainer.BOTTOM]: { height: size, width: '100%' },
    };

    return computedSize[position];
  }, [position, size]);

  return (
    <Modal
      id='aside'
      isOpen={isOpen}
      onClose={onClose}
      opacity={0.6}
      windowOffset={0}
      animation='none'
      className={cn('polpo-aside-modal', className, position)}
      rootStyle={modalRootStyles}
      backdropOnClick={onClose}
      position={position}
      {...modalProps}
    >
      {!noCloseButton && (
        <span className='close-modal-button' onClick={onClose}>
          <LuX />
        </span>
      )}
      <section className={cn('polpo-aside-modal-content', contentClassName)}>{children}</section>
    </Modal>
  );
};
