import React, { useMemo } from 'react';

import { cn } from '../../../helpers';
import { ModalState } from '../../../hooks';

export enum ModalBackdrop {
  OPAQUE = 'opaque',
  TRANSPARENT = 'transparent',
  BLUR = 'blur',
  NONE = 'none',
}

export type BackdropProps = {
  opacity?: number;
  backdrop?: `${ModalBackdrop}`;
  zIndex?: React.CSSProperties['zIndex'];
  backdropOnClick?: () => void;
  modalState?: ModalState;
};

export const Backdrop = ({
  opacity = 0.6,
  backdrop = ModalBackdrop.BLUR,
  zIndex,
  backdropOnClick,
  modalState,
}: BackdropProps) => {
  const backgroundStyles = useMemo(() => {
    const backdropStyles = {
      [ModalBackdrop.OPAQUE]: {
        background: `hsl(from var(--color-background-paper) h s l / ${opacity * 100}%)`,
      },
      [ModalBackdrop.TRANSPARENT]: {
        background: 'transparent',
      },
      [ModalBackdrop.BLUR]: {
        background: `hsl(from var(--color-background-paper) h s l / ${opacity * 100}%)`,
        backdropFilter: 'blur(5px)',
      },
      [ModalBackdrop.NONE]: {
        display: 'none',
      },
    };

    return backdropStyles[backdrop] ?? {};
  }, [backdrop, opacity]);

  if (backdrop === ModalBackdrop.NONE) {
    return null;
  }

  return (
    <section
      tabIndex={-1}
      onClick={backdropOnClick}
      className={cn(
        'polpo-modal-backdrop',
        modalState === ModalState.CLOSING || (modalState === ModalState.CLOSED && 'backdrop-close'),
      )}
      style={{
        zIndex,
        ...backgroundStyles,
      }}
    />
  );
};
