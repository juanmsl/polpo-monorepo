import React, { useEffect, useRef } from 'react';

import { cn } from '../../helpers';

import './ripple.styles.css';

interface RippleProps {
  color?: string;
  disabled?: boolean;
  duration?: number;
  timingFunction?: React.CSSProperties['animationTimingFunction'];
  times?: number;
  className?: string;
  style?: React.CSSProperties;
  zIndex?: React.CSSProperties['zIndex'];
}

export const Ripple = ({
  color,
  disabled,
  duration = 1000,
  timingFunction = 'ease-out',
  times = 1,
  className = '',
  style = {},
  zIndex = 1,
}: RippleProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current?.parentElement) {
      return;
    }

    const computedPosition = getComputedStyle(ref.current.parentElement).position;

    if (!['absolute', 'fixed', 'sticky', 'relative'].includes(computedPosition)) {
      ref.current.parentElement.style.position = 'relative';
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const { clientX, clientY, currentTarget } = e;

    const rect = currentTarget.getBoundingClientRect();

    const x = ((clientX - rect.left) * 100) / rect.width;
    const y = ((clientY - rect.top) * 100) / rect.height;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    ripple.style.animationDuration = `${duration}ms`;
    ripple.style.animationTimingFunction = timingFunction;
    ripple.style.left = `${x}%`;
    ripple.style.top = `${y}%`;

    if (color) {
      ripple.style.background = color;
    }

    currentTarget.appendChild(ripple);

    setTimeout(
      () => {
        ripple.remove();
      },
      Math.max(duration, 500) * Math.max(times, 1),
    );
  };

  if (disabled) {
    return null;
  }

  return (
    <span ref={ref} onMouseDown={handleClick} className={cn('polpo-ripple', className)} style={{ ...style, zIndex }} />
  );
};
