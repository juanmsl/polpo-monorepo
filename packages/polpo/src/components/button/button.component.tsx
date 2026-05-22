import type { ButtonHTMLAttributes } from 'react';

import { useClassNames } from '../../hooks';
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
}

export const Button = ({
  children,
  color = ColorTypes.DEFAULT,
  variant = VariantTypes.SOLID,
  radius = RadiusTypes.MEDIUM,
  size = SizeTypes.REGULAR,
  noWrap = false,
  forIcon = false,
  className = '',
  ...props
}: ButtonProps) => {
  const classNames = useClassNames({
    button: true,
    [color]: Boolean(color),
    [variant]: Boolean(variant),
    [`radius-${radius}`]: Boolean(radius),
    [`size-${size}`]: Boolean(size),
    'no-wrap': noWrap,
    icon: forIcon,
    [className]: Boolean(className),
  });

  return (
    <button {...props} className={classNames}>
      {children}
      <Ripple />
    </button>
  );
};
