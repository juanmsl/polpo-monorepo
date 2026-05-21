import React from 'react';
import { IconType } from 'react-icons';
import { ImCross } from 'react-icons/im';

import { useClassNames } from '../../../hooks';
import { Typography } from '../../typography';

import './field.styles.css';
import { FieldOrientation, FieldProps, FieldVariant } from './field.types';

type GetIconParams = {
  icon?: IconType;
  onClick: (e: React.MouseEvent) => void;
  className: string;
};

const getIcon = ({ icon: Icon, className, onClick }: GetIconParams) =>
  Icon ? <Icon className={className} onClick={onClick} /> : <span />;

export const Field = ({
  id,
  label,
  leftIcon,
  rightIcon,
  errorIcon: ErrorIcon = ImCross,
  error,
  onClickLeftIcon,
  onClickRightIcon,
  fieldOrientation = FieldOrientation.VERTICAL,
  children,
  isFocus = false,
  variant,
  ref,
}: FieldProps) => {
  const fieldClassName = useClassNames({
    'form-field': true,
    focus: isFocus,
    error: !!error,
    'variant-content-border': variant === FieldVariant.CONTENT_BORDER,
    'variant-content-line': variant === FieldVariant.CONTENT_LINE,
    'variant-full-border': variant === FieldVariant.FULL_BORDER,
    'variant-inline': fieldOrientation === FieldOrientation.HORIZONTAL,
  });

  const handleClick = (callback?: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const input = document.getElementById(id);
    input?.focus();
    input?.click();

    if (callback) callback();
  };

  return (
    <section className={fieldClassName} ref={ref}>
      {label ? (
        <Typography className='field-label' noPadding variant='label-form' htmlFor={id}>
          {label}
        </Typography>
      ) : null}
      <section className='field-content'>
        {getIcon({
          className: 'field-left-icon',
          icon: leftIcon,
          onClick: handleClick(onClickLeftIcon),
        })}
        <section className='field-children'>{children}</section>
        {getIcon({
          className: 'field-right-icon',
          icon: rightIcon,
          onClick: handleClick(onClickRightIcon),
        })}
      </section>
      {Boolean(error) && (
        <section className='field-message'>
          {ErrorIcon ? <ErrorIcon size={10} /> : <span />}
          <Typography noPadding variant='small'>
            {error}
          </Typography>
        </section>
      )}
    </section>
  );
};
