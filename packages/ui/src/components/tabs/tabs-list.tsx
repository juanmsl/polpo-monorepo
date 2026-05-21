import React, { useEffect, useRef, useState } from 'react';

import { useClassNames } from '../../hooks';

import { Tabs } from './tabs';

export enum RadiusVariants {
  None = 'none',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Full = 'full',
}

export enum SizeVariants {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

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

export enum TabListColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export enum TabListDirection {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export type TabListProps = {
  openTab: string;
  variant?: `${TabListVariant}`;
  children?: React.ReactNode;
  size?: `${SizeVariants}`;
  color?: `${TabListColor}`;
  radius?: `${RadiusVariants}`;
  direction?: `${TabListDirection}`;
  className?: string;
  style?: React.CSSProperties;
  tabs?: Array<{
    id: string;
    label: React.ReactNode;
  }>;
};

export const TabsList = ({
  tabs = [],
  variant = TabListVariant.SOLID,
  radius = RadiusVariants.Full,
  direction = TabListDirection.HORIZONTAL,
  color,
  children,
  openTab,
  size = SizeVariants.Medium,
  className = '',
  style = {},
}: TabListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedTabRef = useRef<HTMLSpanElement>(null);
  const [isSelectorActive, setIsSelectorActive] = useState(false);
  const [selector, setSelector] = useState(DefaultRect);
  const containerClassNames = useClassNames({
    'tab-list': true,
    [`variant-${variant}`]: Boolean(variant),
    [`size-${size}`]: Boolean(size),
    [`radius-${radius}`]: Boolean(radius),
    [`color-${color}`]: Boolean(color),
    'vertical-direction': direction === TabListDirection.VERTICAL,
    [className]: Boolean(className),
  });

  useEffect(() => {
    const selectedRect = selectedTabRef.current?.getBoundingClientRect() ?? DefaultRect;
    const containerRect = containerRef.current?.getBoundingClientRect() ?? DefaultRect;

    const width = selectedRect.width;
    const height = variant === TabListVariant.LINE ? 2 : selectedRect.height;
    const left = selectedRect.left - containerRect.left;
    const top =
      variant === TabListVariant.LINE
        ? selectedRect.top + selectedRect.height - containerRect.top
        : selectedRect.top - containerRect.top;

    setSelector({ left, top, width, height });

    if (!isSelectorActive) {
      setTimeout(() => {
        setIsSelectorActive(true);
      }, 100);
    }
  }, [isSelectorActive, variant, openTab]);

  return (
    <section className={containerClassNames} ref={containerRef} style={style}>
      {Boolean(variant) && <span className={`tabs-selector ${isSelectorActive ? 'active' : ''}`} style={selector} />}
      {tabs.map(({ id, label }) => (
        <Tabs.Tab key={id} id={id} ref={id === openTab ? selectedTabRef : undefined}>
          {label}
        </Tabs.Tab>
      ))}
      {children}
    </section>
  );
};
