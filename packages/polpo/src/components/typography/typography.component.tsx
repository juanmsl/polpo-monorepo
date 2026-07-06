import React, { createElement, useMemo } from 'react';

import { cn } from '../../helpers';

import {
  TypographyColors,
  TypographyVariant,
  TypographyVariantsClassNames,
  TypographyVariantsElements,
  TypographyWeight,
} from './typography.constants';
import './typography.styles.css';

export type TypographyProps = React.HTMLAttributes<HTMLElement | HTMLLabelElement> & {
  variant?: `${TypographyVariant}`;
  nowrap?: boolean | number;
  as?: React.HTMLElementType;
  weight?: `${TypographyWeight}`;
  children: React.ReactNode;
  noPadding?: boolean;
  htmlFor?: string;
  align?: React.CSSProperties['textAlign'];
  family?: 'primary' | 'code';
  recommendedWidth?: boolean;
  color?: `${TypographyColors}`;
  ref?: React.RefObject<HTMLElement>;
  style?: React.CSSProperties;
};

export const Typography = ({
  variant = TypographyVariant.BODY,
  nowrap = false,
  className: customClassname = '',
  style = {},
  children,
  as,
  weight,
  family = 'primary',
  noPadding = false,
  align,
  color,
  htmlFor,
  recommendedWidth = false,
  ...props
}: TypographyProps) => {
  const component = useMemo<React.HTMLElementType>(
    () => TypographyVariantsElements[variant] ?? TypographyVariantsElements[TypographyVariant.BODY],
    [variant],
  );

  return createElement(
    as ?? component,
    {
      ...props,
      className: cn(
        'polpo-typography',
        TypographyVariantsClassNames[variant],
        customClassname,
        weight,
        color,
        noPadding && 'no-padding',
        family === 'code' && 'code-family',
        recommendedWidth && 'recommended-width',
        typeof nowrap === 'number' && 'nowrap-max-lines',
        nowrap === 2 && 'nowrap-max-lines-2',
        nowrap === 3 && 'nowrap-max-lines-3',
        nowrap === 4 && 'nowrap-max-lines-4',
        nowrap === 5 && 'nowrap-max-lines-5',
        nowrap && 'nowrap',
      ),
      htmlFor,
      style: {
        textAlign: align,
        ...style,
      },
    },
    children,
  );
};
