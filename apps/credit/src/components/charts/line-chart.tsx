import { ResponsiveProps } from '@nivo/core';
import { LineSvgProps, ResponsiveLine } from '@nivo/line';

export type LineSeries = {
  id: string;
  data: ReadonlyArray<{
    x: number;
    y: number;
  }>;
};

interface LineChartProps extends ResponsiveProps<LineSvgProps<LineSeries>> {}

export function LineChart({ data, ...props }: LineChartProps) {
  return (
    <ResponsiveLine /* or Line for fixed dimensions */
      data={data}
      margin={{ top: 50, right: 20, bottom: 50, left: 50 }}
      yScale={{ type: 'linear', min: 0, max: 'auto' }}
      xScale={{ type: 'linear', min: 0, max: 'auto' }}
      enablePoints={false}
      enableSlices='x'
      lineWidth={3}
      pointLabelYOffset={-12}
      enableTouchCrosshair
      enableCrosshair
      useMesh
      legends={[
        {
          anchor: 'top',
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
