import React, { createElement, useMemo } from 'react';

import { useClassNames } from '../../hooks';

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
  const className = useClassNames({
    typography: true,
    [TypographyVariantsClassNames[variant]]: TypographyVariantsClassNames[variant] !== undefined,
    [customClassname]: !!customClassname,
    [weight ?? '']: !!weight,
    [color ?? '']: Boolean(color),
    'no-padding': noPadding,
    'code-family': family === 'code',
    'recommended-width': recommendedWidth,
    'nowrap-max-lines': typeof nowrap === 'number',
    'nowrap-max-lines-2': nowrap === 2,
    'nowrap-max-lines-3': nowrap === 3,
    'nowrap-max-lines-4': nowrap === 4,
    'nowrap-max-lines-5': nowrap === 5,
    nowrap: nowrap === true,
  });

  const component = useMemo<React.HTMLElementType>(
    () => TypographyVariantsElements[variant] ?? TypographyVariantsElements[TypographyVariant.BODY],
    [variant],
  );

  return createElement(
    as ?? component,
    {
      ...props,
      className,
      htmlFor,
      style: {
        textAlign: align,
        ...style,
      },
    },
    children,
  );
};
