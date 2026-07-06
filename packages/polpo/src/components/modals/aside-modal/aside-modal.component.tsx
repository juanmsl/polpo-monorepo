import { CSSProperties, useMemo } from 'react';
import { ImCross } from 'react-icons/im';

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
  style?: React.CSSProperties;
};

export const AsideModal = ({
  children,
  isOpen,
  onClose,
  position = PositionContainer.LEFT,
  size,
  className = '',
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
      <span className='close-modal-button' onClick={onClose}>
        <ImCross />
      </span>
      <section className='polpo-aside-modal-content'>{children}</section>
    </Modal>
  );
};
