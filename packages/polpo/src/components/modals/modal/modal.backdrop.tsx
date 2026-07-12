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
  backdropBackground?: string;
};

export const Backdrop = ({
  opacity = 0.6,
  backdrop = ModalBackdrop.BLUR,
  zIndex,
  backdropOnClick,
  modalState,
  backdropBackground = 'var(--modal-backdrop-background)',
}: BackdropProps) => {
  const backgroundStyles = useMemo(() => {
    const backdropStyles = {
      [ModalBackdrop.OPAQUE]: {
        background: `hsl(from ${backdropBackground} h s l / ${opacity * 100}%)`,
      },
      [ModalBackdrop.TRANSPARENT]: {
        background: 'transparent',
      },
      [ModalBackdrop.BLUR]: {
        background: `hsl(from ${backdropBackground} h s l / ${opacity * 100}%)`,
        backdropFilter: 'blur(2px)',
      },
      [ModalBackdrop.NONE]: {
        display: 'none',
      },
    };

    return backdropStyles[backdrop] ?? {};
  }, [backdrop, backdropBackground, opacity]);

  if (backdrop === ModalBackdrop.NONE) {
    return null;
  }

  return (
    <section
      tabIndex={-1}
      onClick={backdropOnClick}
      className={cn(
        'polpo-modal-backdrop',
        (modalState === ModalState.CLOSING || modalState === ModalState.CLOSED) && 'backdrop-close',
      )}
      style={
        {
          '--modal-backdrop-background': 'var(--color-gray-400)',
          zIndex,
          ...backgroundStyles,
        } as unknown as React.CSSProperties
      }
    />
  );
};
