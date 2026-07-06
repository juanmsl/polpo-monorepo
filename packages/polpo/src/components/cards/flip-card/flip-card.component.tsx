import { CSSProperties, useMemo } from 'react';

import { cn } from '../../../helpers';

import './flip-card.styles.css';

type FlipCardProps = {
  cardZIndex?: CSSProperties['zIndex'];
  isFlipped?: boolean;
  flipSpeed?: number;
  flipDirection?: 'horizontal' | 'vertical';
  children: [React.ReactNode, React.ReactNode];
};

export const FlipCard = ({
  cardZIndex = 'auto',
  flipDirection = 'vertical',
  flipSpeed = 500,
  isFlipped = false,
  children,
}: FlipCardProps) => {
  const getComponent = (key: 0 | 1): React.ReactNode => {
    if (children.length !== 2) {
      throw new Error('Component FlipCard requires 2 children');
    }

    return children[key] as React.ReactNode;
  };

  const frontRotate = useMemo(() => {
    const deg = isFlipped ? 180 : 0;

    return `rotate${flipDirection === 'horizontal' ? 'Y' : 'X'}(${deg}deg)`;
  }, [flipDirection, isFlipped]);

  const backRotate = useMemo(() => {
    const deg = isFlipped ? 0 : -180;

    return `rotate${flipDirection === 'horizontal' ? 'Y' : 'X'}(${deg}deg)`;
  }, [flipDirection, isFlipped]);

  return (
    <section
      className={cn('polpo-flip-card', isFlipped && 'is-flipped')}
      style={
        {
          '--cardZIndex': cardZIndex,
          '--flipSpeed': `${flipSpeed}ms`,
          '--frontRotate': frontRotate,
          '--backRotate': backRotate,
        } as React.CSSProperties
      }
    >
      <section className='polpo-flipper'>
        <section className='front'>{getComponent(0)}</section>

        <section className='back'>{getComponent(1)}</section>
      </section>
    </section>
  );
};
