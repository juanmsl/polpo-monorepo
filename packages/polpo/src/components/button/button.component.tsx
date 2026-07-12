import type { ButtonHTMLAttributes } from 'react';

import { FaSpinner } from 'react-icons/fa6';

import { cn } from '../../helpers';
import { ColorTypes, RadiusTypes, SizeTypes, VariantTypes } from '../component.types';
import { Ripple } from '../ripple';

import './button.styles.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: `${ColorTypes}`;
  variant?: `${VariantTypes}`;
  radius?: `${RadiusTypes}`;
  size?: `${SizeTypes}`;
  noWrap?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  forIcon?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  color = ColorTypes.DEFAULT,
  variant = VariantTypes.SOLID,
  radius = RadiusTypes.MEDIUM,
  size = SizeTypes.REGULAR,
  noWrap = false,
  forIcon = false,
  isLoading = false,
  fullWidth = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={disabled || isLoading ? undefined : onClick}
      className={cn(
        'polpo-button',
        color,
        variant,
        fullWidth && 'full',
        radius && `radius-${radius}`,
        size && `size-${size}`,
        noWrap && 'no-wrap',
        forIcon && 'icon',
        className,
        isLoading && 'is-loading',
      )}
    >
      {isLoading ? <FaSpinner className='size-[1.6em] py-[0.3em] animate-spin' /> : children}
      <Ripple disabled={isLoading || disabled} />
    </button>
  );
};
