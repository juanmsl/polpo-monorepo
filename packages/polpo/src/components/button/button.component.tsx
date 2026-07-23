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
  style = {},
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
        variant,
        fullWidth && 'full',
        radius && `radius-${radius}`,
        size && `size-${size}`,
        noWrap && 'no-wrap',
        forIcon && 'icon',
        className,
        isLoading && 'is-loading',
      )}
      style={
        color === ColorTypes.DEFAULT
          ? style
          : ({
              ...style,
              '--color': `var(--color-${color}-500)`,
              '--solid-background': `var(--color-${color}-400)`,
              '--solid-text': `var(--color-${color}-foreground)`,
              '--solid-hover-background': `var(--color-${color}-300)`,
              '--solid-active-background': `var(--color-${color}-500)`,
              '--flat-text': `var(--color-${color}-700)`,
              '--flat-background': `hsl(from var(--color-${color}-400) h s l / 50%)`,
              '--flat-hover-background': `hsl(from var(--color-${color}-300) h s l / 50%)`,
              '--flat-active-background': `hsl(from var(--color-${color}-300) h s l / 80%)`,
              '--outlined-text': `var(--color-${color}-600)`,
              '--outlined-hover-background': `hsl(from var(--color-${color}-400) h s l / 20%)`,
              '--outlined-active-background': `hsl(from var(--color-${color}-500) h s l / 30%)`,
              '--text-hover-background': `hsl(from var(--color-${color}-300) h s l / 20%)`,
              '--text-active-background': `hsl(from var(--color-${color}-400) h s l / 30%)`,
              '--shadow-color': `hsl(from var(--color-${color}-500) h s l / 20%)`,
              '--focus-background': `hsl(from var(--color-${color}-200) h s l / 20%)`,
            } as React.CSSProperties)
      }
    >
      {isLoading ? <FaSpinner className='icon-loader' /> : children}
      <Ripple disabled={isLoading || disabled} />
    </button>
  );
};
