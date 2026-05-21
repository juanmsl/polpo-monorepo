import { useEffect, useMemo, useState } from 'react';

import { useInputHandlers } from '../../../hooks';
import { Controller } from '../controller';
import { Field, InputFieldProps } from '../field';
import { ControllerGeneratorProps, UnControlledComponentProps } from '../form.types';

type FormatFunction = (value: number) => string;

const RegexDecimal = {
  comma: /(?!^-)[^0-9,]/g,
  dot: /(?!^-)[^0-9.]/g,
} as const;

const getCleanedValue = (input: string, decimalSeparator = '.'): string => {
  const regex = decimalSeparator === '.' ? RegexDecimal.dot : RegexDecimal.comma;
  const cleaned = input.replace(regex, '').replace(',', '.');

  if (!cleaned) {
    return '';
  }

  return cleaned;
};

const getFormattedValue = (value: number, format: FormatFunction) => {
  if (!value || Number.isNaN(value)) {
    return format(0);
  }

  return format(value);
};

type FormatConfig = Intl.NumberFormatOptions & {
  locales: Intl.LocalesArgument;
};

type IProps = InputFieldProps<{
  pattern?: string;
  min?: number;
  max?: number;
  format?: FormatConfig | FormatFunction;
  decimalSeparator?: string;
}>;

export const InputNumber = ({
  name,
  value,
  setValue,
  onBlur,
  onFocus,
  pattern,
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
  decimalSeparator,
  format = {
    locales: 'en-US',
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  },
  ...fieldProps
}: UnControlledComponentProps<IProps, number>) => {
  const id = useMemo(() => crypto.randomUUID(), []);
  const formatFunction = useMemo<FormatFunction>(() => {
    if (typeof format === 'function') return format;

    const { locales, ...formatConfig } = format;

    return Intl.NumberFormat(locales, formatConfig).format;
  }, [format]);
  const [formattedValue, setFormattedValue] = useState(getFormattedValue(value, formatFunction));

  const { handlers, isFocus } = useInputHandlers({
    onChange: e => {
      const cleaned = getCleanedValue(e.target.value, decimalSeparator);

      if (cleaned.endsWith('.')) {
        setFormattedValue(e.target.value);
      } else {
        setFormattedValue(getFormattedValue(Number(cleaned), formatFunction));
        setValue(Number(cleaned));
      }
    },
    onBlur: e => {
      const cleaned = getCleanedValue(e.target.value, decimalSeparator);
      setFormattedValue(getFormattedValue(Number(cleaned), formatFunction));
      setValue(Number(cleaned));

      if (onBlur) onBlur(e);
    },
    onFocus: onFocus,
  });

  useEffect(() => {
    const formatted = getFormattedValue(value, formatFunction);

    if (formattedValue !== formatted) {
      setFormattedValue(formatted);
    }
  }, [formatFunction, formattedValue, value]);

  return (
    <Field id={id} error={error} isFocus={isFocus} {...fieldProps}>
      <input
        id={id}
        type='text'
        name={name}
        className={className}
        style={style}
        value={formattedValue}
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

const InputController = ({ rules, ...props }: ControllerGeneratorProps<IProps, number>) => {
  return <Controller Component={InputNumber} defaultValue={0} inputProps={props} rules={rules} />;
};

InputNumber.Controller = InputController;
