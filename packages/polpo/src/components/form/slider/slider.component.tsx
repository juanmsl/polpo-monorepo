import { useMemo } from 'react';

import { cn } from '../../../helpers';
import { useInputHandlers } from '../../../hooks';
import { Controller } from '../controller';
import { Field, InputFieldProps } from '../field';
import { ControllerGeneratorProps, UnControlledComponentProps } from '../form.types';

import './slider.styles.css';

type SliderProps = InputFieldProps<{
  min?: number;
  max?: number;
  step?: number;
  onlySlider?: boolean;
}>;

export const Slider = ({
  name,
  value,
  setValue,
  onBlur,
  onFocus,
  min,
  max,
  step,
  onlySlider = false,
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
}: UnControlledComponentProps<SliderProps, number>) => {
  const id = useMemo(() => crypto.randomUUID(), []);
  const onBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(e);

    const parsedValue = parseInt(`${value}`);

    if (min !== undefined && parsedValue < min) {
      setValue(min);
    }

    if (max !== undefined && parsedValue > max) {
      setValue(max);
    }

    setValue(parsedValue);
  };

  const { isFocus, handlers } = useInputHandlers({
    onBlur: onBlurInput,
    onChange: e => setValue(+e.target.value),
    onFocus: onFocus,
  });

  return (
    <Field id={id} error={error} isFocus={isFocus} {...fieldProps}>
      <section className={cn('polpo-input-slider', isFocus && 'is-focus')}>
        <input
          id={id}
          type='range'
          name={name}
          className={`polpo-slider ${className}`}
          style={style}
          value={value}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          min={min}
          max={max}
          step={step}
          {...handlers}
        />
        {!onlySlider && (
          <input
            id={id}
            type='number'
            name={name}
            className={`polpo-slider-number ${className}`}
            style={style}
            value={value}
            autoComplete={autoComplete}
            disabled={disabled}
            readOnly={readOnly}
            min={min}
            max={max}
            step={step}
            {...handlers}
          />
        )}
      </section>
    </Field>
  );
};

const SliderController = ({ rules, ...props }: ControllerGeneratorProps<SliderProps, number>) => {
  return <Controller Component={Slider} defaultValue={0} inputProps={props} rules={rules} />;
};

Slider.Controller = SliderController;
