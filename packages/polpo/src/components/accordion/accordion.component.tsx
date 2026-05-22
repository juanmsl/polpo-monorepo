import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { useClassNames } from '../../hooks';
import { Line } from '../line';

import './accordion.styles.css';

type AccordionContextState = {
  toggleItem: (id: string) => void;
  openedItems: Array<string>;
};

const AccordionContext = createContext<AccordionContextState | null>(null);

export const useAccordionItem = (id: string): [boolean, () => void] => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('You cant use this component out off an Accordion component');
  }

  const { toggleItem, openedItems } = context;

  const toggle = () => toggleItem(id);

  return [openedItems.includes(id), toggle];
};

type AccordionProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  noSeparators?: boolean;
  multiple?: boolean;
  defaultOpened?: Array<string> | string;
};

export const Accordion = ({
  children,
  className = '',
  noSeparators,
  multiple,
  style = {},
  defaultOpened = [],
}: AccordionProps) => {
  const [openedItems, setOpenedItems] = useState<{ [index: string]: boolean }>(() => {
    return (Array.isArray(defaultOpened) ? defaultOpened : [defaultOpened]).reduce((acc, id) => {
      return typeof id === 'string' ? { ...acc, [id]: true } : acc;
    }, {});
  });

  const toggleItem = useCallback(
    (id: string) => {
      setOpenedItems(prev => ({ ...(multiple ? prev : {}), [id]: !prev[id] }));
    },
    [multiple],
  );

  const openedItemsIDs = useMemo(() => Object.keys(openedItems).filter(id => openedItems[id]), [openedItems]);

  const accordionClassName = useClassNames({
    accordion: true,
    [className]: Boolean(className),
  });

  return (
    <AccordionContext.Provider
      value={{
        toggleItem,
        openedItems: openedItemsIDs,
      }}
    >
      <section className={accordionClassName} style={style}>
        {(Array.isArray(children) ? children : [children]).flatMap((child, key) => {
          return key === 0 ? child : [noSeparators ? null : <Line orientation='horizontal' key={`${key}.5`} />, child];
        })}
      </section>
    </AccordionContext.Provider>
  );
};
