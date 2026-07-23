import { cn } from '../../helpers';
import { ColorTypes, RadiusTypes, SizeTypes } from '../component.types';

import './badge.styles.css';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  color?: `${ColorTypes}`;
  radius?: `${RadiusTypes}`;
  size?: `${SizeTypes}`;
  noWrap?: boolean;
  ref?: React.Ref<HTMLElement>;
  forIcon?: boolean;
  selected?: boolean;
}

export const Badge = ({
  children,
  color = ColorTypes.DEFAULT,
  radius = RadiusTypes.MEDIUM,
  size = SizeTypes.REGULAR,
  noWrap = false,
  forIcon = false,
  className = '',
  style = {},
  selected = false,
  ...props
}: BadgeProps) => {
  return (
    <span
      {...props}
      className={cn(
        'polpo-badge',
        radius && `radius-${radius}`,
        size && `size-${size}`,
        noWrap && 'no-wrap',
        forIcon && 'icon',
        selected && 'is-selected',
        className,
      )}
      style={
        color === ColorTypes.DEFAULT
          ? style
          : ({
              ...style,
              '--text': `var(--color-${color}-foreground)`,
              '--background': `var(--color-${color}-400)`,
              '--background-selected': `var(--color-${color}-700)`,
              '--text-selected': `var(--color-${color}-50)`,
            } as React.CSSProperties)
      }
    >
      {children}
    </span>
  );
};
