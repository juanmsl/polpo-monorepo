import { useClassNames } from '../../hooks';

import './tag.styles.css';

export enum TagRounded {
  NONE = 'none',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  FULL = 'full',
}

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  selected?: boolean;
  rounded?: `${TagRounded}`;
  noWrap?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export const Tag = ({ children, rounded = TagRounded.MEDIUM, selected = false, noWrap = false, ref }: TagProps) => {
  const className = useClassNames({
    tag: true,
    [`rounded-${rounded}`]: Boolean(rounded),
    'is-selected': selected,
    'no-wrap': noWrap,
  });

  return (
    <span className={className} ref={ref}>
      {children}
    </span>
  );
};
