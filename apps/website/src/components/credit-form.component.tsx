import { InputNumber, Line, Slider, Tooltip, Typography } from 'polpo/components';
import { Grid } from 'polpo/layouts';
import React from 'react';

import { Metric } from '@/components/metric.component';
import { getTotalTime, MoneyFormat, PercentageFormat } from '@/helpers';
import { AmortizationFormData } from '@/types';

type CreditFormProps = {
  propertyValue: number;
  periods: number;
  interest: number;
  creditValue: number;
  monthlyFee: number;
  initialPayment: number;
  onChange: (key: keyof AmortizationFormData, value: number) => void;
};

export const CreditForm = ({
  propertyValue,
  periods,
  interest,
  creditValue,
  monthlyFee,
  initialPayment,
  onChange,
}: CreditFormProps) => {
  const initialPaymentPercentage = Math.round((initialPayment / propertyValue) * 10000) / 100;

  return (
    <section className='main-section'>
      <section className='left-card'>
        <InputNumber
          name='propertyValue'
          variant='line'
          value={propertyValue}
          setValue={v => onChange('propertyValue', v)}
          label='Valor de la propiedad'
          decimalSeparator=','
          format={{
            locales: 'es-CO',
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }}
        />
        <InputNumber
          name='initialPayment'
          variant='line'
          value={initialPayment}
          setValue={v => onChange('initialPayment', v)}
          label='Valor del pago inicial'
          decimalSeparator=','
          format={{
            locales: 'es-CO',
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }}
        />
        <Slider
          name='periods'
          value={periods}
          setValue={v => onChange('periods', v)}
          label='Plazo del credito (meses)'
          min={5 * 12}
          max={20 * 12}
          step={12}
        />
        <Slider
          name='interest'
          value={interest * 1200}
          setValue={v => onChange('interest', v / 1200)}
          label='Interes anual'
          min={5}
          max={20}
        />
      </section>
      <section className='right-card'>
        <Typography variant='label' weight='bold' color='primary' noPadding>
          Crédito
        </Typography>
        <Typography variant='header2' color='primary' noPadding>
          {MoneyFormat(creditValue)}
        </Typography>
        <section>
          <section
            className='credit-bar'
            style={{ '--credit-size': `${100 - initialPaymentPercentage}%` } as React.CSSProperties}
          />
          <Grid jc='space-between' flow='column' ai='center'>
            <Tooltip position='right' content={MoneyFormat(initialPayment)}>
              <Typography variant='label'>{initialPaymentPercentage}%</Typography>
            </Tooltip>
            <Tooltip position='left' content='Valor de la propiedad'>
              <Typography variant='label'>{MoneyFormat(propertyValue)}</Typography>
            </Tooltip>
          </Grid>
        </section>
        <Grid flow='column' gap='1em' jc='start'>
          <Tooltip content='Interes mensual' position='bottom'>
            <Metric label='Interes' value={PercentageFormat(interest * 100)} />
          </Tooltip>
          <Line orientation='vertical' />
          <Tooltip position='bottom' content={getTotalTime(periods)}>
            <Metric label='Meses' value={periods} />
          </Tooltip>
          <Line orientation='vertical' />
          <Metric label='Cuota mensual' value={MoneyFormat(monthlyFee)} />
        </Grid>
      </section>
    </section>
  );
};
