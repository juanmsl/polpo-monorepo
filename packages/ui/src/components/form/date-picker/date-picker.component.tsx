import { useMemo } from 'react';

import { useInputHandlers } from '../../../hooks';
import { Controller } from '../controller';
import { Field, InputFieldProps } from '../field';
import { ControllerGeneratorProps, UnControlledComponentProps } from '../form.types';

type DatePickerProps = InputFieldProps<{
  type?: 'date' | 'datetime-local' | 'month' | 'time' | 'week';
}>;

export const DatePicker = ({
  name,
  value,
  setValue,
  onBlur,
  onFocus,
  type = 'date',
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
  ...fieldProps
}: UnControlledComponentProps<DatePickerProps, string>) => {
  const id = useMemo(() => crypto.randomUUID(), []);
  const { isFocus, handlers } = useInputHandlers({
    onBlur: onBlur,
    onChange: e => setValue(e.target.value),
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
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        {...handlers}
      />
    </Field>
  );
};

const DatePickerController = ({ rules, ...props }: ControllerGeneratorProps<DatePickerProps, string>) => {
  return <Controller Component={DatePicker} defaultValue='' inputProps={props} rules={rules} />;
};

DatePicker.Controller = DatePickerController;
