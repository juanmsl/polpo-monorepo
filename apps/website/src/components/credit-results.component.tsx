import { Line, Typography } from 'polpo/components';
import { Grid } from 'polpo/layouts';
import { useMemo } from 'react';

import { Metric } from '@/components/metric.component';
import { getCreditResults, getTotalTime, MoneyFixedFormat, MoneyFormat, PercentageFormat } from '@/helpers';
import { RowData } from '@/types';

type CreditResultsProps = {
  periods: number;
  creditValue: number;
  monthlyFee: number;
  extraPayment: number;
  data: Array<RowData>;
};

export const CreditResults = ({ periods, creditValue, data, monthlyFee, extraPayment }: CreditResultsProps) => {
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
    <section className='third-section'>
      <Grid gap='1em'>
        <Typography variant='header4' noPadding color='primary'>
          Sin abono a capital
        </Typography>
        <section>
          <Metric label='Pago total' value={MoneyFixedFormat(stats.noExtraPayment.total)} />
          <Metric label='Intereses' value={MoneyFixedFormat(stats.noExtraPayment.interest)} />
        </section>
      </Grid>
      {extraPayment ? (
        <>
          <Line orientation='horizontal' />
          <Grid gap='1em'>
            <Typography variant='header4' noPadding color='primary'>
              Con abono a capital
            </Typography>
            <section>
              <Metric label='Pago total' value={MoneyFixedFormat(stats.extraPayment.total)} />
              <Metric label='Intereses' value={MoneyFixedFormat(stats.extraPayment.interest)} />
            </section>
          </Grid>
          <Line orientation='horizontal' />
          <section>
            <Typography variant='label' noPadding>
              Ahorro del
            </Typography>
            <Typography variant='header1' noPadding>
              {PercentageFormat(stats.totalPaymentSavingsPercentage)}
            </Typography>
            <Grid>
              <Typography variant='label'>
                Pagando <b>{MoneyFormat(extraPayment)}</b> extra mensualmente, terminarás de pagar el crédito en{' '}
                <b>{getTotalTime(data.length - 1)}</b>, en lugar de <b>{getTotalTime(periods)}</b>, pagándolo un{' '}
                <b>{PercentageFormat(stats.timeSavingsPercentage)}</b> más rápido.
              </Typography>
            </Grid>
          </section>
        </>
      ) : null}
    </section>
  );
};
