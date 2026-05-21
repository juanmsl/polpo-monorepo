import { useMemo } from 'react';
import { IconType } from 'react-icons';
import { IoCheckmarkOutline } from 'react-icons/io5';

import { useClassNames, useInputHandlers } from '../../../hooks';
import { ColorTypes, SizeTypes } from '../../component.types';
import { Typography } from '../../typography';
import { Controller } from '../controller';
import { ControllerGeneratorProps, UnControlledComponentProps } from '../form.types';

import './checkbox.styles.css';

type CheckboxProps = {
  label?: React.ReactNode;
  placeholder?: never;
  icon?: IconType;
  color?: `${ColorTypes}`;
  size?: `${SizeTypes}`;
};

export const Checkbox = ({
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
  icon: Icon = IoCheckmarkOutline,
  label,
  color = ColorTypes.PRIMARY,
  size = SizeTypes.REGULAR,
  /*
   * isDirty = false,
   * isTouched = false,
   * invalid = false,
   * error,
   */
}: UnControlledComponentProps<CheckboxProps, boolean>) => {
  const id = useMemo(() => crypto.randomUUID(), []);

  const { handlers } = useInputHandlers<HTMLInputElement>({
    onChange: e => setValue(e.target.checked),
    onBlur: onBlur,
    onFocus: onFocus,
  });

  const checkboxContainerClassName = useClassNames({
    'checkbox-container': true,
    [className]: Boolean(className),
    [`color-${color}`]: Boolean(color),
  });

  const checkboxClassName = useClassNames({
    checkbox: true,
    'is-checked': value,
    [`size-${size}`]: Boolean(size),
  });

  return (
    <section className={checkboxContainerClassName} style={style} onClick={e => e.stopPropagation()}>
      <section className={checkboxClassName}>
        <section className='checkbox-fill'>
          <Icon size='1.3em' className='checkbox-icon' />
        </section>
        <input
          id={id}
          type='checkbox'
          name={name}
          className='checkbox-input'
          checked={value}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          disabled={disabled || readOnly}
          {...handlers}
        />
      </section>
      {label ? (
        <Typography variant='label-form' htmlFor={id} className='checkbox-label'>
          {label}
        </Typography>
      ) : null}
    </section>
  );
};

const CheckboxController = ({ rules, ...props }: ControllerGeneratorProps<CheckboxProps, boolean>) => {
  return <Controller Component={Checkbox} defaultValue={false} inputProps={props} rules={rules} />;
};

Checkbox.Controller = CheckboxController;
