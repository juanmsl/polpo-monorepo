import { ResponsiveProps } from '@nivo/core';
import { PieSvgProps, ResponsivePie } from '@nivo/pie';

interface PieSeries {
  id: string;
  label: string;
  value: number;
}

interface PieChartProps extends ResponsiveProps<PieSvgProps<PieSeries>> {}

export function PieChart({ data, ...props }: PieChartProps) {
  return (
    <ResponsivePie
      data={data}
      arcLabelsTextColor='var(--color-primary-700)'
      colors={['var(--color-secondary)', 'var(--color-primary)']}
      margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
      innerRadius={0.5}
      padAngle={1}
      cornerRadius={10}
      motionConfig='wobbly'
      activeOuterRadiusOffset={8}
      activeInnerRadiusOffset={8}
      arcLinkLabelsThickness={5}
      arcLabelsSkipAngle={10}
      arcLinkLabelsColor={{ from: 'color' }}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          translateY: -40,
          itemWidth: 80,
          itemHeight: 22,
          symbolShape: 'circle',
        },
      ]}
      {...props}
    />
  );
}
