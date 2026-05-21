import { useMemo } from 'react';
import { IconType } from 'react-icons';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IoIosWarning } from 'react-icons/io';

import { useInputHandlers, useToggleValues } from '../../../hooks';
import { Controller } from '../controller';
import { Field, InputFieldProps } from '../field';
import { ControllerGeneratorProps, UnControlledComponentProps } from '../form.types';

type InputPasswordProps = InputFieldProps<{
  rightIcon?: never;
}>;

export const InputPassword = ({
  name,
  value,
  setValue,
  onBlur,
  onFocus,
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
}: UnControlledComponentProps<InputPasswordProps, string>) => {
  const id = useMemo(() => crypto.randomUUID(), []);
  const [type, toggle] = useToggleValues<'password' | 'text'>(['password', 'text']);
  const { isFocus, handlers } = useInputHandlers({
    onBlur: onBlur,
    onChange: e => setValue(e.target.value),
    onFocus: onFocus,
  });

  const icon = useMemo<IconType>(() => {
    if (type === 'password') return FiEye;

    if (type === 'text') return FiEyeOff;

    return IoIosWarning;
  }, [type]);

  return (
    <Field id={id} error={error} isFocus={isFocus} {...fieldProps} rightIcon={icon} onClickRightIcon={() => toggle()}>
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

const InputPasswordController = ({ rules, ...props }: ControllerGeneratorProps<InputPasswordProps, string>) => {
  return <Controller Component={InputPassword} defaultValue='' inputProps={props} rules={rules} />;
};

InputPassword.Controller = InputPasswordController;
