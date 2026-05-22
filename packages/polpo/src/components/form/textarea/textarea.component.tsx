import React, { useMemo } from 'react';

import { useClassNames, useInputHandlers } from '../../../hooks';
import { Controller } from '../controller';
import { Field, InputFieldProps } from '../field';
import { ControllerGeneratorProps, UnControlledComponentProps } from '../form.types';

import './textarea.styles.css';

type TextareaProps = InputFieldProps<{
  rows?: number;
  resize?: React.CSSProperties['resize'];
  leftIcon?: never;
  rightIcon?: never;
}>;

export const Textarea = ({
  name,
  value,
  setValue,
  onBlur,
  onFocus,
  rows = 4,
  resize = 'vertical',
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
}: UnControlledComponentProps<TextareaProps, string>) => {
  const id = useMemo(() => crypto.randomUUID(), []);
  const { handlers, isFocus } = useInputHandlers<HTMLTextAreaElement>({
    onBlur: onBlur,
    onChange: e => setValue(e.target.value),
    onFocus: onFocus,
  });

  const textareaClassName = useClassNames({
    textarea: true,
    [className]: Boolean(className),
  });

  return (
    <Field id={id} error={error} isFocus={isFocus} {...fieldProps}>
      <textarea
        id={id}
        name={name}
        className={textareaClassName}
        style={{
          resize: resize,
          ...style,
        }}
        value={value}
        rows={rows}
        {...handlers}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
      />
    </Field>
  );
};

const TextareaController = ({ rules, ...props }: ControllerGeneratorProps<TextareaProps, string>) => {
  return <Controller Component={Textarea} defaultValue='' inputProps={props} rules={rules} />;
};

Textarea.Controller = TextareaController;
