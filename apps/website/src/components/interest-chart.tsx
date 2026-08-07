import { useMemo } from 'react';

import { PieChart } from '@/components/charts';
import { CompactFormat, getCreditResults, MoneyFixedFormat, MoneyFormat, PercentageFormat } from '@/helpers';
import { RowData } from '@/types';

interface InterestChartProps {
  data: Array<RowData>;
  creditValue: number;
  periods: number;
  monthlyFee: number;
  extraPayment: number;
}

export const InterestChart = ({ data, extraPayment, creditValue, periods, monthlyFee }: InterestChartProps) => {
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

  const savings = stats.noExtraPayment.total - creditValue - stats.extraPayment.interest;

  return (
    <section className='w-full h-200 grid grid-rows-[1fr_auto]'>
      <section>
        <PieChart
          startAngle={-90}
          endAngle={90}
          valueFormat={CompactFormat}
          tooltip={({ datum }) => {
            return (
              <div className='bg-white px-4 py-2 rounded-2xl whitespace-nowrap shadow-2xl'>
                <label className='m-0 font-bold text-center block'>{datum.label}</label>
                <small className='flex items-center gap-4 justify-between px-4 py-1 bg-background-paper rounded-2xl'>
                  <span>{MoneyFixedFormat(datum.value)}</span>
                </small>
              </div>
            );
          }}
          data={[
            {
              id: 'Capital',
              label: 'Capital',
              value: creditValue,
            },
            {
              id: 'Intereses',
              label: 'Intereses',
              value: stats.extraPayment.interest,
            },
            ...(extraPayment
              ? [
                  {
                    id: 'Ahorro',
                    label: 'Ahorro',
                    value: savings,
                  },
                ]
              : []),
          ]}
          colors={['var(--color-primary-300)', 'var(--color-secondary-300)', 'var(--color-active-300)']}
        />
      </section>
      <section>
        {Boolean(extraPayment) && (
          <label className='block px-4 py-2 bg-info/20 text-info-700 text-center rounded-xl'>
            Pagando <b>{MoneyFormat(extraPayment)}</b> extra mensualmente, te ahorrarias{' '}
            <b>
              {MoneyFixedFormat(savings)} ({PercentageFormat((savings / stats.noExtraPayment.interest) * 100)})
            </b>{' '}
            en intereses.
          </label>
        )}
      </section>
    </section>
  );
};
