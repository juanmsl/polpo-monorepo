import React from 'react';

export enum TypographyColors {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  ACTIVE = 'active',
  WARNING = 'warning',
  ALERT = 'alert',
  INFO = 'info',
}

export enum TypographyVariant {
  HERO = 'hero',
  HEADER1 = 'header1',
  HEADER2 = 'header2',
  HEADER3 = 'header3',
  HEADER4 = 'header4',
  BODY = 'body',
  LABEL = 'label',
  LABEL_FORM = 'label-form',
  SMALL = 'small',
}

export const TypographyVariantsElements: Record<TypographyVariant, React.HTMLElementType> = {
  [TypographyVariant.HERO]: 'h1',
  [TypographyVariant.HEADER1]: 'h1',
  [TypographyVariant.HEADER2]: 'h2',
  [TypographyVariant.HEADER3]: 'h3',
  [TypographyVariant.HEADER4]: 'h4',
  [TypographyVariant.BODY]: 'p',
  [TypographyVariant.LABEL]: 'span',
  [TypographyVariant.LABEL_FORM]: 'label',
  [TypographyVariant.SMALL]: 'small',
};

export const TypographyVariantsClassNames: Record<TypographyVariant, string> = {
  [TypographyVariant.HERO]: 'hero',
  [TypographyVariant.HEADER1]: 'header1',
  [TypographyVariant.HEADER2]: 'header2',
  [TypographyVariant.HEADER3]: 'header3',
  [TypographyVariant.HEADER4]: 'header4',
  [TypographyVariant.BODY]: 'body',
  [TypographyVariant.LABEL]: 'label',
  [TypographyVariant.LABEL_FORM]: 'label',
  [TypographyVariant.SMALL]: 'small',
};

export enum TypographyWeight {
  LIGHT = 'light',
  REGULAR = 'regular',
  BOLD = 'bold',
}
