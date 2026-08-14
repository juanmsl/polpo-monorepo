import { Button, InputNumber, SlideCard, Switch, Typography } from 'polpo/components';
import { Grid } from 'polpo/layouts';
import { useState } from 'react';
import { FaEquals, FaPlus } from 'react-icons/fa6';

import { Metric } from '@/components/metric.component';
import { getSuggestedPayment, MoneyFormat } from '@/helpers';
import { AmortizationFormData } from '@/types';

type ExtraPaymentFormProps = {
  monthlyFee: number;
  monthlyPayment: number;
  extraPayment: number;
  onChange: (key: keyof AmortizationFormData, value: number) => void;
};

export const ExtraPaymentForm = ({ onChange, monthlyFee, monthlyPayment, extraPayment }: ExtraPaymentFormProps) => {
  const [addAdditionalPayment, setAddAdditionalPayment] = useState(false);

  return (
    <section className='second-section'>
      <Grid jc='space-between' flow='column' className='section-header'>
        <Typography noPadding>¿Quieres hacer abonos recurrentes a capital?</Typography>
        <Switch
          name='addAdditionalPayment'
          value={addAdditionalPayment}
          setValue={v => {
            setAddAdditionalPayment(v);
            onChange('monthlyPayment', 0);
          }}
          color='primary'
          leftLabel='No'
          rightLabel='¡Si!'
        />
      </Grid>
      <SlideCard isOpen={addAdditionalPayment}>
        <Grid gap='2em' className='section-content'>
          <section>
            <Typography noPadding>¿Cuanto quieres pagar en total, al mes?</Typography>
            <Typography variant='label' weight='bold' noPadding>
              (Sumando la cuota obligatoria + el abono que quieres hacer)
            </Typography>
          </section>
          <section className='grid gap-4 items-end md:grid-cols-[1fr_auto]'>
            <InputNumber
              label='Pago mensual total'
              name='monthly-payment'
              variant='line'
              value={monthlyPayment}
              setValue={v => onChange('monthlyPayment', v)}
              decimalSeparator=','
              format={{
                locales: 'es-CO',
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }}
            />
            <section className='grid md:grid-flow-col gap-2'>
              <Button
                variant='flat'
                color='primary'
                forIcon
                size='small'
                onClick={() => onChange('monthlyPayment', getSuggestedPayment(monthlyFee, 1))}
              >
                {MoneyFormat(getSuggestedPayment(monthlyFee, 1))}
              </Button>
              <Button
                variant='flat'
                color='primary'
                forIcon
                size='small'
                onClick={() => onChange('monthlyPayment', getSuggestedPayment(monthlyFee, 2))}
              >
                {MoneyFormat(getSuggestedPayment(monthlyFee, 2))}
              </Button>
              <Button
                variant='flat'
                color='primary'
                forIcon
                size='small'
                onClick={() => onChange('monthlyPayment', getSuggestedPayment(monthlyFee, 3))}
              >
                {MoneyFormat(getSuggestedPayment(monthlyFee, 3))}
              </Button>
              <Button
                variant='flat'
                color='primary'
                forIcon
                size='small'
                onClick={() => onChange('monthlyPayment', getSuggestedPayment(monthlyFee, 5))}
              >
                {MoneyFormat(getSuggestedPayment(monthlyFee, 5))}
              </Button>
            </section>
          </section>
          <section className='grid md:grid-flow-col gap-4 md:gap-8 justify-center place-items-center'>
            <section className='grid xs:grid-flow-col gap-4 md:gap-8 justify-center place-items-center'>
              <Metric label='Cuota mensual' value={MoneyFormat(monthlyFee)} />
              <FaPlus />
              <Metric label='Abono' value={MoneyFormat(extraPayment)} />
            </section>
            <FaEquals />
            <Metric label='Pago mensual' value={MoneyFormat(monthlyFee + extraPayment)} />
          </section>
        </Grid>
      </SlideCard>
    </section>
  );
};
