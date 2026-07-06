import { useEffect } from 'react';

import { useDebounce, useInView } from '../../hooks';

import './infinity-scroll.styles.css';

interface InfinityScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  hasNextPage: boolean;
  loadMore: () => void;
  customLoadMoreElement?: (ref: React.RefObject<HTMLElement | null>) => React.ReactNode;
  emptyMessage?: string;
  children?: React.ReactNode;
}

export const InfinityScroll = ({
  isLoading: isLoadingProp = false,
  hasNextPage = false,
  loadMore,
  customLoadMoreElement,
  emptyMessage,
  children,
}: InfinityScrollProps) => {
  const { ref, inView } = useInView();
  const isLoading = useDebounce(isLoadingProp, 100);

  useEffect(() => {
    if (hasNextPage && inView && !isLoading) {
      loadMore();
    }
  }, [hasNextPage, isLoading, loadMore, inView]);

  const childrenExists = Array.isArray(children) ? children.length > 0 : Boolean(children);

  return (
    <>
      {children}
      <section className='polpo-infinity-scroll'>
        {Boolean(emptyMessage) && !childrenExists && !isLoading && <p className='empty-message'>{emptyMessage}</p>}
        {(hasNextPage || isLoading) &&
          (customLoadMoreElement ? (
            customLoadMoreElement(ref)
          ) : (
            <section ref={ref} className='loading'>
              {isLoading && <span className='loading--icon'>:D</span>}
            </section>
          ))}
      </section>
    </>
  );
};
