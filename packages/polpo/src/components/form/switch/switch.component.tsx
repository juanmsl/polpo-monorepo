import { useMemo } from 'react';
import { IconType } from 'react-icons';

import { useClassNames, useInputHandlers } from '../../../hooks';
import { ColorTypes, SizeTypes } from '../../component.types';
import { Tooltip } from '../../tooltips';
import { Typography } from '../../typography';
import { Controller } from '../controller';
import { ControllerGeneratorProps, UnControlledComponentProps } from '../form.types';

import './switch.styles.css';

const DotSizeMap = {
  [SizeTypes.SMALL]: 1,
  [SizeTypes.REGULAR]: 1.2,
  [SizeTypes.LARGE]: 1.4,
};

const WidthMap = {
  [SizeTypes.SMALL]: 2,
  [SizeTypes.REGULAR]: 2.5,
  [SizeTypes.LARGE]: 3,
};

type SwitchProps = {
  leftLabel?: string;
  rightLabel?: string;
  label?: string;
  dotHoverSize?: number;
  padding?: number;
  leftIcon?: IconType;
  rightIcon?: IconType;
  internalLeftIcon?: IconType;
  internalRightIcon?: IconType;
  leftIconTooltip?: string;
  rightIconTooltip?: string;
  color?: `${ColorTypes}`;
  size?: `${SizeTypes}`;
  width?: `${SizeTypes}`;
};

export const Switch = ({
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
  label,
  leftLabel,
  rightLabel,
  width = SizeTypes.REGULAR,
  size = SizeTypes.REGULAR,
  dotHoverSize = 1.3,
  padding = 0.25,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  internalLeftIcon: InternalLeftIcon,
  internalRightIcon: InternalRightIcon,
  leftIconTooltip,
  rightIconTooltip,
  color,
  /*
   * isDirty = false,
   * isTouched = false,
   * invalid = false,
   * error,
   */
}: UnControlledComponentProps<SwitchProps, boolean>) => {
  const id = useMemo(() => crypto.randomUUID(), []);
  const { handlers } = useInputHandlers<HTMLInputElement>({
    onChange: e => setValue(e.target.checked),
    onBlur: onBlur,
    onFocus: onFocus,
  });

  const switchContainerClassName = useClassNames({
    'switch-container': true,
    [className]: Boolean(className),
    [`color-${color}`]: Boolean(color),
  });

  const switchClassName = useClassNames({
    switch: true,
    'is-checked': value,
    'is-readonly': !disabled && readOnly,
  });

  const dotSize = DotSizeMap[size] ?? DotSizeMap[SizeTypes.REGULAR];
  const _width = (WidthMap[width] ?? WidthMap[SizeTypes.REGULAR]) * dotSize;
  const _padding = Math.min(padding, dotSize);

  return (
    <section
      className={switchContainerClassName}
      style={
        {
          ...style,
          '--width': `${_width}em`,
          '--dot-size': `${dotSize}em`,
          '--dot-hover-size': `${dotSize * Math.min(Math.max(dotHoverSize, 1), 2)}em`,
          '--padding': `${_padding}em`,
        } as React.CSSProperties
      }
    >
      {leftLabel ? (
        <Typography variant='label-form' className='switch-label' htmlFor={id}>
          {leftLabel}
        </Typography>
      ) : null}
      {LeftIcon !== undefined && (
        <Tooltip content={leftIconTooltip} disabled={!leftIconTooltip} offset={10}>
          <LeftIcon size={`${dotSize * 0.7}em`} className='switch-icon' onClick={() => setValue(!value)} />
        </Tooltip>
      )}
      <section className={switchClassName}>
        {InternalLeftIcon !== undefined && (
          <span className='switch-internal-left-icon'>
            <InternalLeftIcon size={`${dotSize * 0.7}em`} />
          </span>
        )}
        {InternalRightIcon !== undefined && (
          <span className='switch-internal-right-icon'>
            <InternalRightIcon size={`${dotSize * 0.7}em`} />
          </span>
        )}
        <span className='switch-dot' />
        <input
          id={id}
          type='checkbox'
          name={name}
          className={`switch-checkbox ${className}`}
          style={style}
          checked={value}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled || readOnly}
          {...handlers}
        />
      </section>
      {RightIcon !== undefined && (
        <Tooltip content={rightIconTooltip} disabled={!rightIconTooltip} offset={10}>
          <RightIcon size={`${dotSize * 0.7}em`} className='switch-icon' onClick={() => setValue(!value)} />
        </Tooltip>
      )}
      {label || rightLabel ? (
        <Typography variant='label-form' className='switch-label' htmlFor={id}>
          {label || rightLabel}
        </Typography>
      ) : null}
    </section>
  );
};

const SwitchController = ({ rules, ...props }: ControllerGeneratorProps<SwitchProps, boolean>) => {
  return <Controller Component={Switch} defaultValue={false} inputProps={props} rules={rules} />;
};

Switch.Controller = SwitchController;
