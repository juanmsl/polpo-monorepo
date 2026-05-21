import React from 'react';
import { IconType } from 'react-icons';

export enum FieldVariant {
  FULL_BORDER = 'full-border',
  CONTENT_BORDER = 'content-border',
  CONTENT_LINE = 'line',
}

export enum FieldOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

type FieldSharedProps = {
  rightIcon?: IconType;
  leftIcon?: IconType;
  errorIcon?: IconType;
  onClickLeftIcon?: () => void;
  onClickRightIcon?: () => void;
  label?: string;
  variant?: `${FieldVariant}`;
  ref?: React.RefObject<HTMLElement | null>;
};

export type FieldProps = FieldSharedProps & {
  children: React.ReactNode;
  id: string;
  error?: string;
  isFocus?: boolean;
  fieldOrientation?: `${FieldOrientation}`;
};

export type InputFieldProps<T> = T & FieldSharedProps;
