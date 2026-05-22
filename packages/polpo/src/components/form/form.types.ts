import React from 'react';
import { UseControllerProps } from 'react-hook-form';

export type Props = { [key: string]: unknown };

export type SharedProps = {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  autoComplete?: string;
  autoFocus?: boolean;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onBlur?: (e: React.FocusEvent<unknown>) => void;
  onFocus?: (e: React.FocusEvent<unknown>) => void;
};

export type UnControlledProps<V> = {
  value: V;
  setValue: (value: V) => void;
  invalid?: boolean;
  isTouched?: boolean;
  isDirty?: boolean;
  error?: string;
};

export type ControlledProps<V> = {
  defaultValue?: V;
};

export type UnControlledComponentProps<T extends Props, V> = T & SharedProps & UnControlledProps<V>;

export type ControlledComponentProps<T extends Props, V> = T & SharedProps & ControlledProps<V>;

export type ControllerGeneratorProps<T extends Props, V> = ControlledComponentProps<T, V> &
  Partial<Pick<UseControllerProps, 'rules'>>;
