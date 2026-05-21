import Color from 'color';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HexAlphaColorPicker, HexColorInput } from 'react-colorful';
import { FaEyeDropper } from 'react-icons/fa6';
import useEyeDropper from 'use-eye-dropper';

import { useClassNames, useInputHandlers } from '../../../hooks';
import { Modal } from '../../modals';
import { Controller } from '../controller';
import { Field, InputFieldProps } from '../field';
import { ControllerGeneratorProps, UnControlledComponentProps } from '../form.types';

import './input-color.styles.css';

type ColorProps = InputFieldProps<{
  showValueText?: boolean;
}>;

export const InputColor = ({
  name,
  value,
  setValue,
  onBlur,
  onFocus,
  showValueText = false,
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
}: UnControlledComponentProps<ColorProps, string>) => {
  const { open, isSupported } = useEyeDropper();
  const [inputValue, setInputValue] = useState<string>(value);
  const id = useMemo(() => crypto.randomUUID(), []);
  const containerRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { handlers, isFocus } = useInputHandlers({
    onChange: e => setInputValue(e.target.value),
    onBlur: e => {
      setInputColor();

      if (onBlur) onBlur(e);
    },
    onFocus: e => {
      setInputColor();

      if (onFocus) onFocus(e);
    },
  });

  const borderColor = useMemo(() => {
    const color = Color(value === '' ? '#000000' : value);

    if (color.isLight() || color.alpha() < 0.5) {
      return '#000000';
    }

    return '#FFFFFF';
  }, [value]);

  const openEyeDropper = async () => {
    const { sRGBHex } = await open();
    setValue(sRGBHex);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const setInputColor = useCallback(() => {
    if (inputValue.match(/^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i)) {
      setValue(inputValue);
    } else {
      setInputValue(value);
    }
  }, [inputValue, setValue, value]);

  const inputBoxClassName = useClassNames({
    'input-color-box': true,
    [className]: Boolean(className),
  });

  return (
    <Field id={id} error={error} isFocus={isFocus} {...fieldProps}>
      <section
        className='input-color'
        onClick={e => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        ref={containerRef}
      >
        <section
          className={inputBoxClassName}
          style={{
            borderColor,
            background: value,
            color: value,
            ...style,
          }}
        />
        {showValueText ? (
          <input
            id={id}
            name={name}
            value={inputValue}
            placeholder={placeholder}
            readOnly={readOnly}
            autoFocus={autoFocus}
            disabled={disabled}
            autoComplete={autoComplete}
            className='color-input'
            {...handlers}
          />
        ) : null}
      </section>

      <Modal
        id='input-color'
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position='bottom right'
        offset={5}
        backdrop='transparent'
        containerRef={containerRef}
        className='input-color-selector'
      >
        <HexAlphaColorPicker id={id} color={value} onChange={setValue} />
        <section className='color-input-container'>
          {isSupported() ? (
            <FaEyeDropper
              onClick={() => {
                void openEyeDropper();
              }}
            />
          ) : (
            <span />
          )}
          <HexColorInput
            className='color-input'
            id={id}
            name={name}
            color={value}
            placeholder='Type a color'
            prefixed
            alpha
            onChange={setValue}
          />
          <span />
        </section>
      </Modal>
    </Field>
  );
};

const InputColorController = ({ rules, ...props }: ControllerGeneratorProps<ColorProps, string>) => {
  return <Controller Component={InputColor} defaultValue='#147EFB' inputProps={props} rules={rules} />;
};

InputColor.Controller = InputColorController;
