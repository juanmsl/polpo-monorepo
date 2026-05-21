import React from 'react';
import { Controller as RHFController, useFormContext, UseControllerProps } from 'react-hook-form';

import { ControlledComponentProps, Props, UnControlledComponentProps } from '../form.types';

type ControllerProps<T extends Props, V> = {
  inputProps: ControlledComponentProps<T, V>;
  Component: React.FC<UnControlledComponentProps<T, V>>;
  rules?: UseControllerProps['rules'];
  defaultValue: V;
};

export const Controller = <T extends Props, V>({
  Component,
  inputProps,
  defaultValue: fieldDefaultValue,
  rules,
}: ControllerProps<T, V>) => {
  const { control, setValue } = useFormContext();
  const { name, defaultValue } = inputProps;

  return (
    <RHFController
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? fieldDefaultValue}
      render={({ field: { onBlur, value }, fieldState }) => (
        <Component
          value={value}
          error={fieldState.error?.message}
          invalid={fieldState.invalid}
          isTouched={fieldState.isTouched}
          isDirty={fieldState.isDirty}
          setValue={value => setValue(name, value)}
          onBlur={onBlur}
          {...inputProps}
        />
      )}
    />
  );
};
