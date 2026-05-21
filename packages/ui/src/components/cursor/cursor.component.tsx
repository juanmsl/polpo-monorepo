import { useEffect, useState } from 'react';

import { useEventListener, useMousePosition } from '../../hooks';

import './cursor.styles.css';

export const Cursor = () => {
  const { x, y, elementX, elementY, ref } = useMousePosition();
  const [isCursorHover, setIsCursorHover] = useState(false);

  useEventListener('mouseover', e => {
    const computedCursor = getComputedStyle(e.target as HTMLElement).cursor;

    setIsCursorHover(computedCursor === 'pointer');
  });

  useEffect(() => {
    if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
      document.body.style.cursor = 'none';
    }

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (x === null || y === null || 'ontouchstart' in window || navigator.maxTouchPoints) {
    return null;
  }

  const translate3d = `translate3d(${elementX}px, ${elementY}px, 0)`;

  return (
    <section className='cursor-overlay' ref={ref}>
      <span
        className={`cursor outer-circle ${isCursorHover ? 'cursor-hover' : ''}`}
        style={{
          transform: translate3d,
        }}
      />
      <span
        className={`cursor inner-circle ${isCursorHover ? 'cursor-hover' : ''}`}
        style={{
          transform: translate3d,
        }}
      />
    </section>
  );
};
