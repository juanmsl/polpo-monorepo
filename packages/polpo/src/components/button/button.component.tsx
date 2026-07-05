import type { ButtonHTMLAttributes } from 'react';

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
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
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
      )}
    >
      {children}
      <Ripple />
    </button>
  );
};
