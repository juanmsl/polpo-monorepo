import { useMemo } from 'react';

import { LineChart } from '@/components/charts';
import {
  CompactFormat,
  getCreditResults,
  getTotalTime,
  MoneyFixedFormat,
  MoneyFormat,
  PercentageFormat,
} from '@/helpers';
import { RowData } from '@/types';

interface CreditChartProps {
  data: Array<RowData>;
  originalData: Array<RowData>;
  creditValue: number;
  periods: number;
  monthlyFee: number;
  extraPayment: number;
}

export const CreditChart = ({
  data,
  originalData,
  monthlyFee,
  extraPayment,
  creditValue,
  periods,
}: CreditChartProps) => {
  const stats = useMemo(
    () =>
      getCreditResults({
        creditValue,
        data,
        monthlyFee,
        periods,
      }),
    [creditValue, data, monthlyFee, periods],
  );

  const chartData = {
    id: 'Con abono',
    data: data.map(item => ({
      x: item.period,
      y: item.balance,
    })),
  };

  const chartOriginalData = {
    id: 'Sin abono',
    data: originalData.map(item => ({
      x: item.period,
      y: item.balance,
    })),
  };

  return (
    <section className='w-full h-200 grid grid-rows-[1fr_auto]'>
      <section>
        <LineChart
          axisLeft={{ legendOffset: -40, format: CompactFormat }}
          axisBottom={{ legend: 'Meses', legendOffset: 36, tickValues: 20 }}
          yFormat={MoneyFixedFormat}
          data={extraPayment ? [chartData, chartOriginalData] : [chartOriginalData]}
          colors={extraPayment ? ['var(--color-primary)', 'var(--color-secondary)'] : ['var(--color-primary)']}
          sliceTooltip={({ slice }) => {
            return (
              <div className='bg-white px-4 py-2 rounded-2xl w-80 whitespace-nowrap shadow-2xl'>
                <small className='flex items-center gap-4 justify-between px-4 py-1 bg-background-paper rounded-2xl'>
                  <span>{getTotalTime(slice.points[0].data.x)}</span>
                  <span>{PercentageFormat((slice.points[0].data.x / periods) * 100)}</span>
                </small>

                <section className='grid gap-4'>
                  {slice.points.map(point => (
                    <section key={point.id} className='flex gap-4 justify-between items-center'>
                      <section className='flex gap-4 items-center'>
                        <span className='size-6 rounded-full block' style={{ background: point.color }}></span>
                        <section className='grid' key={point.id}>
                          <small className='m-0'>{point.seriesId}: </small>
                          <label className='m-0'>{point.data.yFormatted}</label>
                        </section>
                      </section>
                      <section>
                        <small className='m-0 px-2 py-1 rounded-full bg-primary/10 text-primary'>
                          {PercentageFormat(((creditValue - point.data.y) / creditValue) * 100)}
                        </small>
                      </section>
                    </section>
                  ))}
                </section>
              </div>
            );
          }}
          markers={
            extraPayment
              ? [
                  {
                    axis: 'x',
                    value: data[data.length - 1].period,
                    legend: `Pago con abono finalizado (${PercentageFormat((data[data.length - 1].period / periods) * 100)} del tiempo)`,
                    legendOrientation: 'vertical',
                    lineStyle: {
                      stroke: 'var(--color-primary)',
                      strokeWidth: 1,
                      strokeDasharray: '4 4',
                    },
                    textStyle: {
                      fill: 'var(--color-primary)',
                      fontSize: 12,
                    },
                  },
                ]
              : []
          }
        />
      </section>
      <section>
        {Boolean(extraPayment) && (
          <label className='block px-4 py-2 bg-info/20 text-info-700 text-center rounded-xl'>
            Pagando <b>{MoneyFormat(extraPayment)}</b> extra mensualmente, terminarás de pagar el crédito en{' '}
            <b>{getTotalTime(data.length - 1)}</b>, en lugar de <b>{getTotalTime(periods)}</b>, pagándolo un{' '}
            <b>{PercentageFormat(stats.timeSavingsPercentage)}</b> más rápido.
          </label>
        )}
      </section>
    </section>
  );
};
