import { cn } from '../../helpers';

import './badge.styles.css';

export enum BadgeRounded {
  NONE = 'none',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  FULL = 'full',
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  selected?: boolean;
  rounded?: `${BadgeRounded}`;
  noWrap?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export const Badge = ({
  children,
  rounded = BadgeRounded.MEDIUM,
  selected = false,
  noWrap = false,
  ref,
}: BadgeProps) => {
  return (
    <span
      className={cn('polpo-badge', rounded && `rounded-${rounded}`, selected && 'is-selected', noWrap && 'no-wrap')}
      ref={ref}
    >
      {children}
    </span>
  );
};
