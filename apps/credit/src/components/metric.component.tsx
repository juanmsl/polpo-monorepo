import { Typography } from 'polpo/components';
import React from 'react';

type MetricProps = {
  label: string;
  value: React.ReactNode;
  ref?: React.RefObject<HTMLElement>;
};

export const Metric = ({ label, value, ref }: MetricProps) => (
  <section ref={ref}>
    <Typography variant='label' noPadding>
      {label}
    </Typography>
    <Typography variant='body' weight='bold' noPadding>
      {value}
    </Typography>
  </section>
);
