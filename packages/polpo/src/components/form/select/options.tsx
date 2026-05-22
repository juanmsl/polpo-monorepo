import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { useClassNames, useEventListener, useMediaQuery, useResizeObserver } from '../../../hooks';

import { OptionsProps } from './select.types';

type UseDynamicHeight = {
  height: number;
  minHeight: number;
  containerRef: RefObject<HTMLElement | null>;
  offset: number;
  windowOffset: number;
};

const useDynamicHeight = ({
  height,
  minHeight: defaultMinHeight,
  containerRef,
  offset,
  windowOffset,
}: UseDynamicHeight) => {
  const [h, setH] = useState<string | undefined>(undefined);

  const getMaxHeight = useCallback(() => {
    const containerBottom = containerRef.current?.getBoundingClientRect().bottom ?? 0;

    const heightBottom = window.innerHeight - containerBottom - windowOffset - offset - 5;
    const heightTop = window.innerHeight - windowOffset * 3;
    const heightCalculated = heightBottom < defaultMinHeight ? heightTop : heightBottom;
    const maxHeight = Math.min(heightCalculated, height);
    const minHeight = Math.max(maxHeight, defaultMinHeight);

    setH(`${Math.round(minHeight)}px`);
  }, [containerRef, windowOffset, offset, defaultMinHeight, height]);

  useEffect(() => {
    getMaxHeight();
  }, [getMaxHeight]);

  useResizeObserver(containerRef, getMaxHeight);
  useEventListener('resize', getMaxHeight);

  return { h };
};

export const Options = ({
  children,
  searchQueryValue,
  searchQueryPlaceholder = 'Search option',
  searchQueryClassName = '',
  searchQueryStyle = {},
  onSearchQuery,
  containerRef,
  height = 300,
}: OptionsProps) => {
  const optionsGroupContainerRef = useRef<HTMLDivElement>(null);
  const optionsGroupRef = useRef<HTMLUListElement>(null);
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMediaQuery('(max-width: 480px)');

  useEventListener('keydown', e => {
    if (['ArrowDown', 'ArrowUp'].includes(e.code)) {
      e.preventDefault();
      const focusedItem = document.activeElement;
      const isListItem = focusedItem?.tagName === 'LI';

      if (isListItem) {
        switch (e.code) {
          case 'ArrowDown':
            (focusedItem?.nextSibling as HTMLElement)?.focus();

            break;
          case 'ArrowUp':
            (focusedItem?.previousElementSibling as HTMLElement)?.focus();

            break;
        }
      }
    }
  });

  const handleSearchQuery = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      if (onSearchQuery) onSearchQuery(value);

      setInternalSearchQuery(value);
    },
    [onSearchQuery],
  );

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const { h } = useDynamicHeight({
    height,
    minHeight: 150,
    containerRef,
    offset: 5,
    windowOffset: 10,
  });

  const [shouldUseAuto, setShouldUseAuto] = useState(false);

  const calculateHeight = useCallback(() => {
    const optionsContainerHeight =
      Math.round(optionsGroupContainerRef.current?.getBoundingClientRect().height ?? 0) + 2;
    const optionsHeight = Math.round(optionsGroupRef.current?.scrollHeight ?? 0);

    setShouldUseAuto(optionsContainerHeight >= optionsHeight);
  }, []);

  useEffect(calculateHeight, [calculateHeight]);
  useResizeObserver(optionsGroupContainerRef, calculateHeight);
  useResizeObserver(optionsGroupRef, calculateHeight);
  useEventListener('resize', calculateHeight);

  const selectOptionsHeader = useClassNames({
    'select-options-header': true,
    [searchQueryClassName]: Boolean(searchQueryClassName),
  });

  return (
    <section
      className={`select-options ${onSearchQuery ? 'with-search-query' : ''}`}
      style={
        isMobile
          ? {
              maxHeight: window.innerHeight - 100,
              width: window.innerWidth - 100,
            }
          : {
              height: shouldUseAuto ? 'auto' : h,
              maxHeight: height,
              width: containerRef.current?.offsetWidth ?? 'auto',
            }
      }
    >
      {onSearchQuery && (
        <section className={selectOptionsHeader} style={searchQueryStyle}>
          <input
            name='query'
            className='input-search'
            value={searchQueryValue ?? internalSearchQuery}
            onChange={handleSearchQuery}
            placeholder={searchQueryPlaceholder}
            onClick={e => e.stopPropagation()}
            ref={searchInputRef}
            autoFocus
          />
        </section>
      )}
      <section className='select-options-list-container' ref={optionsGroupContainerRef}>
        <ul className='select-options-list' ref={optionsGroupRef}>
          {children}
        </ul>
      </section>
    </section>
  );
};
