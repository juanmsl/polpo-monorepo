import { useMemo } from 'react';

import { cn } from '../../../helpers';
import { useInputHandlers } from '../../../hooks';
import { ColorTypes, SizeTypes } from '../../component.types';
import { Typography } from '../../typography';
import { Controller } from '../controller';
import { ControllerGeneratorProps, UnControlledComponentProps } from '../form.types';

import './radio.styles.css';

type RadioProps = {
  label?: string;
  radioValue: string;
  placeholder?: never;
  color?: `${ColorTypes}`;
  size?: `${SizeTypes}`;
};

export const Radio = ({
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
  autoComplete = 'off',
  radioValue,
  label,
  color = ColorTypes.PRIMARY,
  size = SizeTypes.REGULAR,
  /*
   * isDirty = false,
   * isTouched = false,
   * invalid = false,
   * error,
   */
}: UnControlledComponentProps<RadioProps, string>) => {
  const id = useMemo(() => crypto.randomUUID(), []);
  const { handlers } = useInputHandlers({
    onChange: e => setValue(e.target.value),
    onBlur: onBlur,
    onFocus: onFocus,
  });

  return (
    <section className={cn('polpo-radio-container', className, color && [`color-${color}`])} style={style}>
      <section className={cn('polpo-radio', radioValue === value && 'is-checked', size && [`size-${size}`])}>
        <section className='polpo-radio-fill' />
        <input
          id={id}
          type='radio'
          name={name}
          className={`polpo-radio-input ${className}`}
          style={style}
          value={radioValue}
          checked={radioValue === value}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          disabled={disabled || readOnly}
          {...handlers}
        />
      </section>
      {label ? (
        <Typography variant='label-form' htmlFor={id} className='polpo-radio-label'>
          {label}
        </Typography>
      ) : null}
    </section>
  );
};

const RadioController = ({ rules, ...props }: ControllerGeneratorProps<RadioProps, string>) => {
  return <Controller Component={Radio} defaultValue='' inputProps={props} rules={rules} />;
};

Radio.Controller = RadioController;
