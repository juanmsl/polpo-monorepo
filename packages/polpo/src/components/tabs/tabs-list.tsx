import React, { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '../../helpers';
import { useEventListener, useResizeObserver } from '../../hooks';
import { ColorTypes, RadiusTypes, SizeTypes } from '../component.types';

import { Tabs } from './tabs';

const DefaultRect = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
};

export enum TabListVariant {
  SOLID = 'solid',
  GHOST = 'ghost',
  FLAT = 'flat',
  LINE = 'line',
}

export enum TabListDirection {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export type TabListProps = {
  openTab: string;
  variant?: `${TabListVariant}`;
  children?: React.ReactNode;
  size?: `${SizeTypes}`;
  color?: `${ColorTypes}`;
  radius?: `${RadiusTypes}`;
  direction?: `${TabListDirection}`;
  className?: string;
  tabsClassName?: string | ((isActive: boolean) => string);
  variantLineHeight?: number;
  selectorClassName?: string;
  style?: React.CSSProperties;
  tabs?: Array<{
    id: string;
    label: React.ReactNode;
    className?: string | ((isActive: boolean) => string);
    style?: React.CSSProperties;
  }>;
};

export const TabsList = ({
  tabs = [],
  variant = TabListVariant.SOLID,
  radius = RadiusTypes.SMALL,
  direction = TabListDirection.HORIZONTAL,
  color = ColorTypes.DEFAULT,
  size = SizeTypes.REGULAR,
  children,
  openTab,
  variantLineHeight = 3,
  className = '',
  tabsClassName = '',
  selectorClassName = '',
  style = {},
}: TabListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedTabRef = useRef<HTMLSpanElement>(null);
  const [isSelectorActive, setIsSelectorActive] = useState(false);
  const [selector, setSelector] = useState(DefaultRect);

  const updateSelector = useCallback(() => {
    const selectedRect = selectedTabRef.current?.getBoundingClientRect() ?? DefaultRect;
    const containerRect = containerRef.current?.getBoundingClientRect() ?? DefaultRect;

    const width = selectedRect.width;
    const height = variant === TabListVariant.LINE ? variantLineHeight : selectedRect.height;
    const left = selectedRect.left - containerRect.left;
    const top =
      variant === TabListVariant.LINE
        ? selectedRect.top + selectedRect.height - containerRect.top
        : selectedRect.top - containerRect.top;

    setSelector({ left, top, width, height });

    if (!isSelectorActive) {
      setTimeout(() => {
        setIsSelectorActive(true);
      }, 50);
    }
  }, [isSelectorActive, variant, variantLineHeight]);

  useEventListener('resize', updateSelector);
  useResizeObserver(containerRef, updateSelector);

  useEffect(() => {
    updateSelector();
  }, [openTab, updateSelector]);

  return (
    <section
      className={cn(
        'polpo-tab-list',
        variant && `variant-${variant}`,
        size && `size-${size}`,
        radius && `radius-${radius}`,
        direction === TabListDirection.VERTICAL && 'vertical-direction',
        className,
      )}
      ref={containerRef}
      style={
        color === ColorTypes.DEFAULT
          ? style
          : ({
              ...style,
              '--color': `var(--color-${color}-500)`,
              '--color-contrast': `var(--color-${color}-50)`,
            } as React.CSSProperties)
      }
    >
      {Boolean(variant) && (
        <span className={cn('polpo-tabs-selector', isSelectorActive && 'active', selectorClassName)} style={selector} />
      )}
      {tabs.map(({ id, label, className, style }) => (
        <Tabs.Tab
          key={id}
          id={id}
          className={className || tabsClassName}
          style={style}
          ref={id === openTab ? selectedTabRef : undefined}
        >
          {label}
        </Tabs.Tab>
      ))}
      {children}
    </section>
  );
};
