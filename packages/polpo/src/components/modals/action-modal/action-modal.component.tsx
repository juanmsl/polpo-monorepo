import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { ImCross } from 'react-icons/im';

import { cn, PositionContainer } from '../../../helpers';
import { Button, ButtonProps } from '../../button';
import { Typography } from '../../typography';
import { Modal, ModalProps } from '../modal';

import './action-modal.styles.css';

type ActionModalContextType = {
  onClose: () => void;
  isActionInProgress: boolean;
  setIsActionInProgress: (isActionInProgress: boolean) => void;
};

const ActionModalContext = createContext<ActionModalContextType | null>(null);

const useActionModalContext = () => {
  const context = useContext(ActionModalContext);

  if (!context) {
    throw new Error('useActionModalContext must be used within a ActionModal');
  }

  return context;
};

export type ActionModalProps = Omit<
  ModalProps,
  'id' | 'animation' | 'closeAnimationClassName' | 'position' | 'rootStyle' | 'className' | 'style'
> & {
  actionRequired?: boolean;
  icon?: IconType;
  noCloseButton?: boolean;
  lineOnTop?: boolean;
  backCard?: boolean;
  noPadding?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export const ActionModal = ({
  children,
  isOpen,
  onClose,
  actionRequired,
  icon: Icon,
  noCloseButton,
  lineOnTop = false,
  backCard = false,
  noPadding = false,
  className = '',
  style = {},
  ...modalProps
}: ActionModalProps) => {
  const [isActionInProgress, setIsActionInProgress] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const remainAction = useCallback(() => {
    ref.current?.classList.add('shake-animation');
    setTimeout(() => {
      ref.current?.classList.remove('shake-animation');
    }, 500);
  }, []);

  return (
    <ActionModalContext.Provider value={{ onClose, isActionInProgress, setIsActionInProgress }}>
      <Modal
        className='polpo-action-modal'
        id='action-modal'
        animation='bounce'
        opacity={0.8}
        isOpen={isOpen}
        onClose={onClose}
        {...modalProps}
        backdropOnClick={actionRequired ? remainAction : onClose}
        position={PositionContainer.CENTER}
      >
        <section ref={ref} className='polpo-modal-content'>
          <section
            className={cn(
              'polpo-action-modal-content',
              backCard && 'back-card',
              lineOnTop && 'line-on-top',
              noPadding && 'no-padding',
            )}
          >
            {!noCloseButton && !actionRequired && (
              <section className='close-modal-button' onClick={() => onClose()}>
                <ImCross />
              </section>
            )}
            {Icon ? (
              <Typography variant='header4' className='action-modal-icon'>
                <Icon />
              </Typography>
            ) : null}
            <section className='polpo-action-modal-body'>
              <section className={`polpo-action-modal-content ${className}`} style={style}>
                {children}
              </section>
            </section>
          </section>
        </section>
      </Modal>
    </ActionModalContext.Provider>
  );
};

type ActionButtonProps = Omit<ButtonProps, 'onClick'> & {
  onClick: (() => Promise<void>) | (() => void);
};

const ActionButton = ({ onClick, children, isLoading: manualIsLoading, ...buttonProps }: ActionButtonProps) => {
  const { onClose, isActionInProgress, setIsActionInProgress } = useActionModalContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = useCallback(() => {
    setIsLoading(true);
    setIsActionInProgress(true);
    const result = onClick();

    if (result instanceof Promise) {
      result.then(() => {
        onClose();
        setIsLoading(false);
        setIsActionInProgress(false);
      });
    } else {
      onClose();
      setIsLoading(false);
      setIsActionInProgress(false);
    }
  }, [onClick, onClose, setIsActionInProgress]);

  if (!isLoading && isActionInProgress) {
    return null;
  }

  return (
    <Button {...buttonProps} onClick={handleAction} isLoading={manualIsLoading || isLoading}>
      {children}
    </Button>
  );
};

ActionModal.ActionButton = ActionButton;
