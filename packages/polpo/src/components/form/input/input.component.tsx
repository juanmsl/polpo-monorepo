import { useMemo } from 'react';

import { useInputHandlers } from '../../../hooks';
import { Controller } from '../controller';
import { Field, InputFieldProps } from '../field';
import { ControllerGeneratorProps, UnControlledComponentProps } from '../form.types';

type IProps = InputFieldProps<{
  pattern?: string;
  type?: 'email' | 'search' | 'text' | 'url';
  min?: number;
  max?: number;
}>;

export const Input = ({
  name,
  value,
  setValue,
  onBlur,
  onFocus,
  pattern,
  type = 'text',
  className = '',
  style = {},
  autoFocus = false,
  readOnly = false,
  disabled = false,
  placeholder = '',
  autoComplete = 'off',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isDirty = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isTouched = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  invalid = false,
  error,
  min,
  max,
  ...fieldProps
}: UnControlledComponentProps<IProps, string>) => {
  const id = useMemo(() => crypto.randomUUID(), []);
  const { handlers, isFocus } = useInputHandlers({
    onChange: e => setValue(e.target.value),
    onBlur: onBlur,
    onFocus: onFocus,
  });

  return (
    <Field id={id} error={error} isFocus={isFocus} {...fieldProps}>
      <input
        id={id}
        type={type}
        name={name}
        className={className}
        style={style}
        value={value}
        pattern={pattern}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        max={max}
        {...handlers}
      />
    </Field>
  );
};

const InputController = ({ rules, ...props }: ControllerGeneratorProps<IProps, string>) => {
  return <Controller Component={Input} defaultValue='' inputProps={props} rules={rules} />;
};

Input.Controller = InputController;
