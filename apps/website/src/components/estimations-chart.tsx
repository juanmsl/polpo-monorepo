import { useMemo } from 'react';

import { BarChart } from '@/components/charts';
import { CompactFormat, getCreditResults, MoneyFixedFormat, MoneyFormat, PercentageFormat } from '@/helpers';
import { RowData } from '@/types';

interface EstimationsChartProps {
  data: Array<RowData>;
  originalData: Array<RowData>;
  creditValue: number;
  periods: number;
  monthlyFee: number;
  extraPayment: number;
}

export const EstimationsChart = ({
  data,
  originalData,
  extraPayment,
  creditValue,
  periods,
  monthlyFee,
}: EstimationsChartProps) => {
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

  return (
    <section className='w-full h-200 grid grid-rows-[1fr_auto]'>
      <section>
        <BarChart
          indexBy='id'
          groupMode='stacked'
          valueFormat={MoneyFixedFormat}
          colors={['var(--color-primary-300)', 'var(--color-secondary-300)']}
          axisLeft={{ format: CompactFormat }}
          keys={['Capital', 'Intereses']}
          data={
            data.length === originalData.length
              ? [
                  {
                    id: 'Credito',
                    Capital: creditValue,
                    Intereses: stats.noExtraPayment.interest,
                  },
                ]
              : [
                  {
                    id: 'Sin Abono',
                    Capital: creditValue,
                    Intereses: stats.noExtraPayment.interest,
                  },
                  {
                    id: 'Con Abono',
                    Capital: creditValue,
                    Intereses: stats.extraPayment.interest,
                  },
                ]
          }
        />
      </section>
      <section>
        {data.length < originalData.length && (
          <label className='block px-4 py-2 bg-info/20 text-info-700 text-center rounded-xl'>
            Pagando <b>{MoneyFormat(extraPayment)}</b> extra mensualmente, pagaras en total{' '}
            <b>{MoneyFixedFormat(stats.extraPayment.total)}</b> en lugar de{' '}
            <b>{MoneyFixedFormat(stats.noExtraPayment.total)}</b>. Teniendo un ahorro del{' '}
            <b>{PercentageFormat((stats.extraPayment.total / stats.noExtraPayment.total - 1) * -100)}</b> sobre el pago
            total de todo el credito
          </label>
        )}
      </section>
    </section>
  );
};
