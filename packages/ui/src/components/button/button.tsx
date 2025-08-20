import { cva, type VariantProps } from 'class-variance-authority';
import React, { ButtonHTMLAttributes } from 'react';

import { ThemeColor } from '../../../contexts';
import { SizeVariants, RadiusVariants, ColorVariants } from '../../../core/variants';
import { useClassNames } from '../../hooks';
import { Icon, IconNameT } from '../../icon';
import { Ripple } from '../../ripple';

import { ButtonStyle, ButtonColorStyles } from './button.style';

export enum ButtonVariant {
  SOLID = 'solid',
  GHOST = 'ghost',
  FLAT = 'flat',
}

const getColor = (color?: ThemeColor): ButtonColorStyles | null => {
  if (color) {
    return {
      $color: color.main,
      $colorDark: color.dark,
      $colorContrast: color.contrast,
    };
  }

  return null;
};

const ButtonVariants = cva(
  'cursor-pointer font-[bold] grid grid-flow-col gap-[0.7em] items-center whitespace-nowrap text-ellipsis overflow-hidden justify-items-center text-center justify-center relative select-none',
  {
    variants: {
      variant: {
        solid: 'bg-primary text-white',
        ghost: 'bg-primary text-white',
        flat: 'bg-primary text-white',
      },
      fit: {
        false: null,
        true: 'fit-content',
      },
      full: {
        false: null,
        true: 'w-full',
      },
    },
  },
);

export type ButtonProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  size?: `${SizeVariants}`;
  radius?: `${RadiusVariants}`;
  variant?: `${ButtonVariant}`;
  leftIcon?: IconNameT;
  rightIcon?: IconNameT;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  width?: 'fit' | 'full';
  className?: string;
  style?: React.CSSProperties;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  noShadow?: boolean;
  color?: `${ColorVariants}`;
};

const ButtonComponent = (
  {
    children,
    disabled = false,
    radius = RadiusVariants.Medium,
    isLoading = false,
    size = SizeVariants.Medium,
    variant = 'solid',
    leftIcon,
    rightIcon,
    onClick,
    width = 'fit',
    className = '',
    style = {},
    noShadow = false,
    color,
    type = 'button',
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const theme = useTheme();
  const buttonClassName = useClassNames({
    'ghost-variant': variant === ButtonVariant.GHOST,
    'flat-variant': variant === ButtonVariant.FLAT,
    'is-loading': !disabled && isLoading,
    'no-shadow': noShadow,
    [width]: !!width,
    [className]: !!className,
  });

  const buttonColors: ButtonColorStyles = (color && getColor(theme.colors[color])) || {
    $color: theme.colors.text.main,
    $colorDark: theme.colors.text.dark,
    $colorContrast: theme.colors.background.main,
  };

  return (
    <ButtonStyle
      ref={ref}
      {...buttonColors}
      className={buttonClassName}
      style={style}
      disabled={disabled}
      onClick={onClick}
      type={type}
      $size={size}
      $radius={radius}
    >
      {leftIcon && (!isLoading || disabled) && <Icon className='button-left-icon' name={leftIcon} />}
      <span className='button-text'>
        {!disabled && isLoading ? <Icon name='spinner' className='button-loader-icon' /> : children}
      </span>
      {rightIcon && (!isLoading || disabled) && <Icon className='button-right-icon' name={rightIcon} />}
      <Ripple />
    </ButtonStyle>
  );
};

export const Button = React.forwardRef(ButtonComponent);
