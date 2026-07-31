import { BarSvgProps, ResponsiveBar } from '@nivo/bar';
import { ResponsiveProps } from '@nivo/core';

interface BarChartProps extends ResponsiveProps<BarSvgProps<Record<string, string | number>>> {}

export function BarChart({ data, ...props }: BarChartProps) {
  return (
    <ResponsiveBar
      data={data}
      labelSkipWidth={12}
      labelSkipHeight={12}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          translateX: 120,
          itemsSpacing: 3,
          itemWidth: 100,
          itemHeight: 16,
        },
      ]}
      margin={{ top: 50, right: 130, bottom: 50, left: 70 }}
      {...props}
    />
  );
}
