import { MouseEvent, MouseEventHandler, useCallback, useRef } from 'react';

import { cn } from '../../../helpers';
import { useEventListener } from '../../../hooks';

import './hover-card.styles.css';

type HoverCardProps = {
  children: React.ReactNode;
  threshold?: number;
  translationZ?: number;
  width?: 'fit-content' | '100%';
  className?: string;
};

export const HoverCard = ({
  children,
  threshold = 5,
  translationZ = 25,
  width = 'fit-content',
  className = '',
}: HoverCardProps) => {
  const refCard = useRef<HTMLElement>(null);
  const refLayer = useRef<HTMLElement>(null);

  const mouseMoveCallback = useCallback(
    (e: MouseEvent) => {
      const card = refCard.current;
      const layer = refLayer.current;

      if (!card || !layer) return;

      const { clientX, clientY, currentTarget } = e;
      const { clientWidth, clientHeight } = currentTarget;
      const { top, left } = card.getBoundingClientRect();

      const horizontal = (clientX - left) / clientWidth;
      const vertical = (clientY - top) / clientHeight;

      const relativePercentageX = horizontal * 2 - 1;
      const relativePercentageY = vertical * 2 - 1;

      const rotateY = (relativePercentageY * threshold).toFixed(2);
      const rotateX = (relativePercentageX * threshold).toFixed(2);

      layer.style.transform = `perspective(${clientWidth}px) rotateX(${-rotateY}deg) rotateY(${rotateX}deg)`;
      card.style.transform = `perspective(${clientWidth}px) translateZ(${translationZ}px)`;
    },
    [threshold, translationZ],
  );

  const mouseLeaveCallback = useCallback<MouseEventHandler>(e => {
    const card = refCard.current;
    const layer = refLayer.current;

    if (!card || !layer) return;

    layer.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0) rotateY(0)`;
    card.style.transform = `perspective(${e.currentTarget.clientWidth}px) translateZ(0)`;
  }, []);

  useEventListener('mousemove', mouseMoveCallback as unknown as EventListener, refCard);
  useEventListener('mouseleave', mouseLeaveCallback as unknown as EventListener, refCard);

  return (
    <span ref={refCard} style={{ width }} className={cn('polpo-hover-card', className)}>
      <span className='polpo-hover-card-layer' ref={refLayer}>
        {children}
      </span>
    </span>
  );
};
