import { cn } from '../../helpers';

import './line.styles.css';

export enum LineOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export enum LineStyle {
  SOLID = 'solid',
  DOTTED = 'dotted',
  DASHED = 'dashed',
}

type LineCommonProps = {
  orientation?: `${LineOrientation}`;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
};

type LineSolidProps = LineCommonProps & {
  lineStyle?: `${LineStyle.SOLID}`;
  spacing?: never;
  dashedSize?: never;
  size?: number;
};

type LineDottedProps = LineCommonProps & {
  lineStyle: `${LineStyle.DOTTED}`;
  spacing?: number;
  size?: number;
  dashedSize?: never;
};

type LineDashedProps = LineCommonProps & {
  lineStyle: `${LineStyle.DASHED}`;
  spacing?: number;
  dashedSize?: number;
  size?: number;
};

type LineProps = LineSolidProps | LineDottedProps | LineDashedProps;

export const Line = ({
  orientation = LineOrientation.HORIZONTAL,
  className = '',
  style = {},
  color = 'currentColor',
  size = 1,
  lineStyle = LineStyle.SOLID,
  dashedSize = 1,
  spacing = 1,
}: LineProps) => {
  return (
    <span
      className={cn('polpo-custom-line', orientation, className, lineStyle)}
      style={
        {
          ...style,
          '--color': color,
          '--size': `${size}px`,
          '--spacing': `${spacing}px`,
          '--dashSize': `${dashedSize}px`,
        } as React.CSSProperties
      }
    />
  );
};
